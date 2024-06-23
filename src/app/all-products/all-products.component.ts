import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { ButtonsService } from '../buttons.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  isComponentVisible :boolean = false; // Cart Default Value
  products: any[] = [];

  constructor(
    private productService: ProductService, private cartService: CartService,
    private buttonsService: ButtonsService, private router: Router
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
  }

  getDiscountPercentage(oldPrice: number, newPrice: number): number {
    return Math.round(oldPrice ? ((oldPrice - newPrice) / oldPrice) * 100 : 0);
  }


  // View Product Details
  viewProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }


  back_top(): void {
    window.scrollTo(0, 0);
  }

}