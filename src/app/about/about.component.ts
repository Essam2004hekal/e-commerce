import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { ButtonsService } from '../buttons.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  isComponentVisible :boolean = false;  // Cart Default Value  
  products: any[] = [];   

  constructor(
    private productService: ProductService, private cartService: CartService,
    private buttonsService: ButtonsService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });

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



  // Cart Functions
  addToCart(product: any): void {
    this.cartService.addToCart(product);
    console.log('Product added to cart:', product);
  }

  getDiscountPercentage(oldPrice: number, newPrice: number): number {
    return Math.round(oldPrice ? ((oldPrice - newPrice) / oldPrice) * 100 : 0);
  }

}
