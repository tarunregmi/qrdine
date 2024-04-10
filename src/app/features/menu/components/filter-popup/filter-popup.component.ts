import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'qd-filter-popup',
  templateUrl: './filter-popup.component.html',
  styleUrls: ['./filter-popup.component.scss']
})
export class FilterPopupComponent implements OnInit {
  @Input() public filter = new EventEmitter();
  public form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      min: new FormControl<number>(0),
      max: new FormControl<number>(1500),
      veg: new FormControl<boolean>(false),
      nonVeg: new FormControl<boolean>(false),
    })
  }

  public onSubmit(): void {
    let veg!: boolean;
    let filterString = '';
    
    filterString += `price>='${this.form.value.min}'`;
    filterString += ` && price<='${this.form.value.max}'`;

    if (this.form.value.veg || this.form.value.nonVeg) {
      if (!(this.form.value.veg && this.form.value.nonVeg)) {
        if (this.form.value.veg) veg = true;
        if (this.form.value.nonVeg) veg = false;
        filterString += ` && veg=${veg}`;
      }
    }

    this.filter.emit(filterString);
  }
}
