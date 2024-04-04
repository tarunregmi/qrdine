import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginformModel } from 'src/app/shared/models/loginform.model';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'qd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy  {
  @Input() public user!: string;
  // Subscriber/Observer
  private subscriber!: Subscription;

  public password = true;
  public form!: FormGroup<LoginformModel<FormControl>>;

  constructor(
    private auth_: AuthService,
    private location_: Location,
    private snackbar_: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup<LoginformModel<FormControl>>({
      identity: new FormControl<string>('', [Validators.required]),
      password: new FormControl<string>('', [Validators.required])
    });
  }

  public onLogin(): void {
    if (this.form.valid) {
      this.subscriber = this.auth_.login(<LoginformModel<string>>this.form.value, this.user).subscribe({
        error: (response: HttpErrorResponse) => {
          this.snackbar_.open(response.error.message, undefined, { duration: 3500});
        },
        complete: () => this.location_.back()
      });
    }
  }

  public OAuth2(): void {
    // 
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }
}
