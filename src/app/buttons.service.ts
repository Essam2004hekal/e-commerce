import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonsService {
  private loginButtonVisible = new BehaviorSubject<boolean>(true);
  loginButtonVisible$ = this.loginButtonVisible.asObservable();

  private signupButtonVisible = new BehaviorSubject<boolean>(true);
  signupButtonVisible$ = this.signupButtonVisible.asObservable();

  showLoginButton() {
    this.loginButtonVisible.next(true);
  }

  hideLoginButton() {
    this.loginButtonVisible.next(false);
  }

  showSignupButton() {
    this.signupButtonVisible.next(true);
  }

  hideSignupButton() {
    this.signupButtonVisible.next(false);
  }
}
