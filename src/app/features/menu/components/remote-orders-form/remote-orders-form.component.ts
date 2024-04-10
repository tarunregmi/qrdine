import { Component, Inject, OnInit, WritableSignal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/shared/models/menu.model';
import { RemoteOrdersService } from 'src/app/shared/services/remote-orders.service';
import { TableService } from 'src/app/shared/services/table.service';

@Component({
  selector: 'qd-remote-orders-form',
  templateUrl: './remote-orders-form.component.html',
  styleUrls: ['./remote-orders-form.component.scss']
})
export class RemoteOrdersFormComponent implements OnInit {

  constructor(
    private remoteOrder_: RemoteOrdersService,
    private table_: TableService,
    private router_: Router,
    private dialogRf: MatDialogRef<RemoteOrdersFormComponent>,
    @Inject(MAT_DIALOG_DATA) private cart: WritableSignal<MenuItem[]>,
  ) {}

  public form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      street1: new FormControl(''),
      street2: new FormControl(''),
      city: new FormControl(''),
      province: new FormControl('')
    });
  }

  public makeRemoteOrder() {
    if (this.form.valid) {
      const table = localStorage.getItem('bookedTable');

      // un-booke table if user accedently book table
      if (table) {
        this.table_.updateTable(table, true);
        localStorage.removeItem('bookedTable');
      }
      this.remoteOrder_.makeRemoteOrder(this.cart, Object.values(this.form.value).join(',')).subscribe({
        next: () => this.clearCart(),
      })
    }
  }

  private clearCart() {
    this.cart.set([]);

    // un-booke table if user accedently book table
    const table = localStorage.getItem('bookedTable');
    if (table) {
      this.table_.updateTable(table, true);
      localStorage.removeItem('bookedTable');
    }

    // remove cart from local-storage
    localStorage.removeItem('cart');

    // close address form
    this.dialogRf.close();

    this.router_.navigate(['/my-orders']);
  }
}
