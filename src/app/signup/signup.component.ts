import { Component, OnInit } from '@angular/core';
import { ButtonsService } from '../buttons.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isComponentVisible :boolean = false; // Cart Default Value

  constructor(private buttonsService: ButtonsService) { }

  ngOnInit(): void {
    this.buttonsService.hideSignupButton(); // Hide Signup btn
    this.buttonsService.showLoginButton(); // show Login btn
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
