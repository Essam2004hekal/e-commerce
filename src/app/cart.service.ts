import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>(this.getCartItemsFromLocalStorage());
  currentCartItems = this.cartItems.asObservable();

  constructor() { }

  private getCartItemsFromLocalStorage(): any[] {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  }

  private updateLocalStorage(items: any[]): void {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }

  addToCart(item: any) {
    const currentItems = this.cartItems.value;

    const itemExists = currentItems.find(cartItem => cartItem.id === item.id);
    
    if (itemExists) {
      Swal.fire({
        icon: 'warning',
        title: 'Product already in cart',
        text: 'This product is already in the cart.'
      });
      return;
    }

    const updatedItems = [...currentItems, item];
    this.cartItems.next(updatedItems);
    this.updateLocalStorage(updatedItems);

    Swal.fire({
      icon: 'success',
      title: 'Product added to cart',
      text: 'The product has been added to your cart.'
    });
  }

  removeFromCart(index: number) {
    const currentItems = this.cartItems.value;
    currentItems.splice(index, 1);
    this.cartItems.next([...currentItems]);
    this.updateLocalStorage(currentItems);
  }
}