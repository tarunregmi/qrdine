import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LoginformModel } from 'src/app/shared/models/loginform.model';
import { UserModel } from 'src/app/shared/models/user.model';
import { LoginService } from 'src/app/shared/services/login.service';
import { SignupformModel } from 'src/app/shared/models/signupform.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // inject other services
  constructor(private httpClient_: HttpClient, private login_: LoginService) {}

  public login(credential: LoginformModel<string>, username?: string) {
    let collection = username || 'collections/users';
    return this.httpClient_.post(`${environment.baseURL}/api/${collection}/auth-with-password`, credential).pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tap((response: any) => {
        const token = response.token;
        if (!username) {
          const user: UserModel = {
            id: response.record.id,
            name: response.record.name,
            email: response.record.email,
            username: response.record.username,
            avatar: response.record.avatar,
            collectionId: response.record.collectionId,
            verified: response.record.verified
          };
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          localStorage.setItem('user', JSON.stringify({ role: username }));
        }
        
        // store login-token and user profile data on local storage
        localStorage.setItem('loginToken', token);

        // then update login-state (signal)
        this.login_.updateIsLogin();
      })
    );
  }

  public signup(credential: SignupformModel<string>) {
    return this.httpClient_.post(`${environment.baseURL}/api/collections/users/records`, credential);
  }
}
