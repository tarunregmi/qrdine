import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuItem } from 'src/app/shared/models/menu.model';

@Component({
  selector: 'qd-edit-menu-popup',
  templateUrl: './edit-menu-popup.component.html',
  styleUrls: ['./edit-menu-popup.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: EditMenuPopupComponent,
    multi: true
  }]
})
export class EditMenuPopupComponent implements OnInit {
  @Output() public addItem = new EventEmitter();
  @Output() public editItem = new EventEmitter();
  @Output() public deleteItem = new EventEmitter();

  private imageFile!: File | undefined;
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MenuItem,
  ) {}

  public form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl<string>(''),
      description: new FormControl<string>(''),
      price: new FormControl(),
      veg: new FormControl<boolean>(false),
    });

    if (this.data) this.populateForm(this.data);
  }

  public onSubmit(): void {
    const formData = new FormData();
    for (const key in this.form.value) formData.append(key, this.form.get(key)?.value);
    if (this.imageFile) formData.append('thumbnail', this.imageFile);

    if (this.form.valid) {
      if (this.data) this.editItem.emit(formData);
      else this.addItem.emit(formData);
    }
  }

  /**
   * 
   * @description get latest selected file update it
   */
  public onImagePicked(event: Event): void {
    this.imageFile = (<HTMLInputElement>event.target).files?.[0];
  }

  /**
   * 
   * @param data Form data to populate the form when user click to edit data
   */
  private populateForm(data: MenuItem) {
    this.form.patchValue({
      title: data.title,
      description: data.description,
      price: data.price,
      veg: data.veg
    });
  }
}
