import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
    const updatedItems = [...currentItems, item];
    this.cartItems.next(updatedItems);
    this.updateLocalStorage(updatedItems);
  }

  removeFromCart(index: number) {
    const currentItems = this.cartItems.value;
    currentItems.splice(index, 1);
    this.cartItems.next([...currentItems]);
    this.updateLocalStorage(currentItems);
  }
}