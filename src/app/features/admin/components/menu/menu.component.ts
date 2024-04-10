import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from 'src/app/features/menu/services/menu.service';
import { MenuItem } from 'src/app/shared/models/menu.model';
import { EditMenuPopupComponent } from './edit-menu-popup/edit-menu-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { fadeIn } from 'src/app/shared/animations/fadeIn';

@Component({
  selector: 'qd-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [ fadeIn ]
})
export class MenuComponent implements OnInit {
  public data: MenuItem[] = [];
  public displayedColumns: string[] = ['thumbnail', 'title', 'price', 'action'];

  constructor (
    public menu_: MenuService,
    private dialog_: MatDialog,
    private snackbar_: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.menu_.pageSize.set(10);
    this.menu_.pageIndex.set(0);
    this.refreshMenu();
  }
  

  public onEdit(item: MenuItem) {
    const dialogRef = this.dialog_.open(EditMenuPopupComponent, { data: item });
    
    const editItemSub = dialogRef.componentInstance.editItem.subscribe((data) => {
      this.menu_.editItem(item.id, data).subscribe({
        next: () => {
          this.refreshMenu();
          dialogRef.close();
        },
        error: (response: HttpErrorResponse) => this.showHttpErrorResponse(response),
      })
    });

    const deleteSub = dialogRef.componentInstance.deleteItem.subscribe(() => {
      this.menu_.deleteItem(item.id).subscribe({
        next: () => {
          this.refreshMenu();
          dialogRef.close();
        },
        error: (response: HttpErrorResponse) => this.showHttpErrorResponse(response),
      });
    });

    dialogRef.afterClosed().subscribe(() => {
      editItemSub.unsubscribe();
      deleteSub.unsubscribe();
    });
  }

  /**
   * @description Add new item to database and refresh its dependents
   */
  public onAddItem() {
    const dialogRef = this.dialog_.open(EditMenuPopupComponent);
    
    const addItemSub = dialogRef.componentInstance.addItem.subscribe((body) => {
      this.menu_.addItem(body).subscribe({
        next: () => {
          this.refreshMenu();
          dialogRef.close();
        },
        error: (response: HttpErrorResponse) => this.showHttpErrorResponse(response),
      });
    });

    dialogRef.afterClosed().subscribe(() => {
      addItemSub.unsubscribe();
    });
  }

  /**
   * @description change menu when paginator change it's page-index
   */
  public changePage(event: PageEvent) {
    this.refreshMenu(event.pageIndex + 1);
  }


  private showHttpErrorResponse(response: HttpErrorResponse) {
    this.snackbar_.open(response.error.message, undefined, { duration: 3500 });
  }

  private refreshMenu(page?: number): void {
    if (page) this.menu_.pageIndex.set(page);
    this.menu_.getItems().subscribe(response => this.data = response)
  }
}
