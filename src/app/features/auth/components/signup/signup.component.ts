import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SignupformModel } from 'src/app/shared/models/signupform.model';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'qd-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  private subscriber!: Subscription;
  
  constructor(private auth_: AuthService, private location_: Location) {}

  public form!: FormGroup<SignupformModel<FormControl>>;

  ngOnInit(): void {
    this.form = new FormGroup<SignupformModel<FormControl>>({
      name: new FormControl<string>('', [Validators.required]),
      username: new FormControl<string>('', [Validators.required]),
      email: new FormControl<string>('', [Validators.required, Validators.pattern(/\w+@\w+\.\w+/),]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
    });
  }

  public onSignup(): void {
    if (this.form.valid) {
      this.subscriber = this.auth_.signup({...<SignupformModel<string>>this.form.value, passwordConfirm: this.form.value.password}).subscribe({
        next: () => {
          this.subscriber.unsubscribe();
          this.subscriber = this.auth_.login({identity: this.form.value.email, password: this.form.value.password}).subscribe({
            complete: () => this.location_.back()
          });
        }
      })
    }
  }

  public getErrorMessage(name: 'email' | 'password'): string {
    if (this.form.controls[name].hasError('required')) return 'This field is required';
    else if (this.form.controls[name].hasError('pattern')) return 'Invalid email';
    else if (this.form.controls[name].hasError('minlength')) return `Length must be >= ${this.form.controls[name].errors?.['minlength'].requiredLength}`;
    return name;
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }
}