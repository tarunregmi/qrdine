import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginformModel } from 'src/app/shared/models/loginform.model';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

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
        error: (response: HttpErrorResponse) => console.log(response.error.message),
        complete: () => this.location_.back()
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }
}
