import { Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly tokenKey: string = 'loginToken';
  public readonly isAdmin = signal<boolean>(false);
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

  public logOut(): void {
    this.isAdmin.set(false);
    this.isLogin.set(false);
    localStorage.removeItem('loginToken');
    localStorage.removeItem('user');
    window.location.reload();
  }

  public validateAdmin(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      if (JSON.parse(atob(token.split('.')[1])).type === 'admin') {
        this.isAdmin.set(true);
        return true;
      }
    }

    this.isAdmin.set(false);
    return false;
  }

  private isLoginState(): boolean {
    return Boolean(localStorage.getItem('loginToken') && localStorage.getItem('user'));
  }

  private sameOriginState(): boolean {
    return environment.baseURL.includes(window.location.hostname);
  }
}
