import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'qd-yes-no-popup',
  templateUrl: './yes-no-popup.component.html',
  styleUrls: ['./yes-no-popup.component.scss']
})
export class YesNoPopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public message: string
  ) {}
}
