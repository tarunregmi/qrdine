import { Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public readonly isLogin = signal<boolean>(this.isLoginState());

  /**
   * sameOrigin == true, means user access app using business local network
   * sameOrigin == false, means user sccess app using business website (internat)
   */
  public readonly sameOrigin = signal<boolean>(this.sameOriginState())

  public updateIsLogin(): void {
    this.isLogin.set(this.isLoginState());
  }

  public updateSameOrigin(): void {
    this.sameOrigin.set(this.sameOriginState());
  }

  public updateAccessCredential(): void {
    this.updateIsLogin();
    this.updateSameOrigin();
  }

  private isLoginState(): boolean {
    return Boolean(localStorage.getItem('loginToken') && localStorage.getItem('user'));
  }

  private sameOriginState(): boolean {
    return environment.baseURL.includes(window.location.hostname);
  }
}
