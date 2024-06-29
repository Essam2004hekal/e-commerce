import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from '../models/cart-item.model';
import Swal from 'sweetalert2'; // Import SweetAlert2


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {

  isComponentVisible: boolean = false;
  cartItems: CartItem[] = [];

  couponCode: string = '';
  discountApplied: boolean = false;
  discountedPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.currentCartItems.subscribe((items: CartItem[]) => {
      this.cartItems = items.map(item => ({ ...item, quantity: 1 }));
      this.updateDiscountedPrice();
    });
  }

  showComponent() {
    this.isComponentVisible = true;
  }

  hideComponent() {
    this.isComponentVisible = false;
  }

  onCartClicked() {
    this.showComponent();
  }

  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  applyCoupon(): void {
    this.discountApplied = false;
    if (this.couponCode === 'mec_1') {
      this.discountApplied = true;
      this.updateDiscountedPrice();
    }
  }

  updateDiscountedPrice(): void {
    const totalPrice = this.getTotalPrice();
    this.discountedPrice = this.discountApplied ? totalPrice * 0.9 : totalPrice;
  }

  increaseQuantity(item: CartItem): void {
    if (item.quantity < 8) {
      item.quantity++;
      item.totalPrice = item.quantity * item.price;
      this.updateDiscountedPrice();
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Maximum Quantity Reached',
        text: 'You cannot add more than 8 items.'
      });
    }
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      item.totalPrice = item.quantity * item.price;
      this.updateDiscountedPrice();
    } else {
      // Swal.fire({
      //   icon: 'warning',
      //   title: 'Minimum Quantity Reached',
      //   text: 'Quantity cannot be less than 1.'
      // });
    }
  }
}
