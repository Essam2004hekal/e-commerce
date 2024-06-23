import { Component, OnInit } from '@angular/core';
import { ButtonsService } from '../buttons.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  isComponentVisible :boolean = false;  // Cart Default Value

  constructor(private buttonsService: ButtonsService) { }

  ngOnInit(): void {
    // Show Sign and Login Buttons
    this.buttonsService.showLoginButton();
    this.buttonsService.showSignupButton();
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
