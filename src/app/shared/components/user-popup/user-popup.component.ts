import { Component, Inject } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment.development';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'qd-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.scss']
})
export class UserPopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public user: UserModel,
    private auth_: AuthService,
  ) {}
  
  public avatar = `${environment.baseURL}/api/files/${this.user.collectionId}/${this.user.id}/${this.user.avatar}`;

  public verifyUser() {
    this.auth_.verifyUser(this.user.id).subscribe({
      next: () => this.user.verified = true
    })
  }
}
