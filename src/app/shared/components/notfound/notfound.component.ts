import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'qd-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
})
export class NotfoundComponent {
  constructor(private location_: Location) {}
  public goBack(): void {
    this.location_.back();
  }
}
