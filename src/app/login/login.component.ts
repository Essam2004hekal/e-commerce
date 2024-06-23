import { Component, OnInit } from '@angular/core';
import { ButtonsService } from '../buttons.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isComponentVisible :boolean = false; // Cart Default Value

  constructor(private buttonsService: ButtonsService) { }

  ngOnInit(): void {
    this.buttonsService.hideLoginButton(); // Hide Login btn
    this.buttonsService.showSignupButton(); // show Signup btn
  }

  // Show and Hide Cart
  showComponent() {
    this.isComponentVisible = true;
  }

  hideComponent() {
    this.isComponentVisible = false;
  }

  onCartClicked() {
    this.showComponent();
  }

}
