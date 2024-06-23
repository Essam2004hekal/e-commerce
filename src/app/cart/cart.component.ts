import { Component, OnInit , Output , EventEmitter } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  @Output() close = new EventEmitter<void>(); // Close cart

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.currentCartItems.subscribe(items => {
      this.cartItems = items;
    })
  }
  
  // Close Cart Function
  onCloseButtonClick() {
    this.close.emit();
  }


  // Cart Functions
  removeItem(index: number) {
    this.cartService.removeFromCart(index)
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.price, 0)
  }

}
