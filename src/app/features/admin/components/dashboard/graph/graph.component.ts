import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'qd-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['../dashboard.component.scss']
})
export class GraphComponent implements OnInit, OnDestroy {
  public chart!: Chart;

  constructor(
    private httpClient_: HttpClient
  ) {}

  ngOnInit(): void {
    this.getLastWeekRevenue();
  }

  private labels() {
    const today = new Date();
    const result: string[] = [];

    for ( let i=1; i<=7; i++ ) {
      const date = new Date(today.getFullYear(),today.getMonth(),today.getDate()-i);
      result.push(date.getDate().toLocaleString());                      // for day in digits
      // result.push(date.toLocaleString('en-us', {weekday:'long'}));    // for day name
    }

    return result.reverse();
  }

  private getLastWeekRevenue(): void {
    let start: Date | string = new Date();
    let end: Date | string = new Date();

    start.setDate(start.getDate() - 7);
    end.setDate(end.getDate());
    
    start = start.toISOString().split('T')[0];
    end = end.toISOString().split('T')[0];

    const filter = encodeURIComponent(`created>='${start}' && created<'${end}'`);
    this.httpClient_.get(`${environment.baseURL}/api/collections/revenue/records?filter=(${filter})`)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .subscribe((response: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const items: any[] = response.items;
      
      // group each items by their creation date
      const groupedItems = items.reduce((r, a) => {
        const key = (new Date(a.created)).toISOString().split('T')[0].split('-')[2];
        // console.log(key);      // un-comment this line to debug filtered day (start - end)
        r[key] = r[key] || [];
        r[key].push(a.money);
        return r;
      }, Object.create({}));

      // calculated sum of each group
      for (const key in groupedItems) {
        groupedItems[key] = groupedItems[key].reduce((acc: number, value: number) => acc+value, 0);
      }

      const reasult: number[] = [];
      this.labels().forEach(lable => {
        if(groupedItems[lable]) reasult.push(groupedItems[lable]);
        else reasult.push(0);
      });
      
      this.drawChart(reasult);
    });
  }

  private drawChart(data: number[]) {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.labels(),
        datasets: [
          {
            fill: true,
            label: 'Revenue',
            data: data,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            title: { text: 'Rs.', display: true },
            beginAtZero: true,
          },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
