import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {

  isComponentVisible :boolean = false; // Cart Default Value
  cartItems: any[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.currentCartItems.subscribe(items => {
      this.cartItems = items;
    });
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


  // Cart Functions
  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.price, 0)
  }

}
