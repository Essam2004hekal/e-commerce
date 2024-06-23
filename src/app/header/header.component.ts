import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { ButtonsService } from '../buttons.service';
import { Router, NavigationEnd } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  activeLink: string = 'home'; // Set Active Link

  @Output() cartClicked = new EventEmitter<void>(); // Close Cart

  // Show Login Buttons
  showLoginButton: boolean = true;
  showSignupButton: boolean = true;
  // Open Links Nav
  isOpen:boolean = true
  isMenuOpen: boolean = false;
  cartItemCount: number = 0;
  cartTotalPrice: number = 0;
  // Search Bar Default Value
  searchTerm: string = '';
  searchResults: any[] = [];
  products: any[] = [];

  constructor (
    private cartService: CartService,
    private productService: ProductService, private buttonsService: ButtonsService,
    private router: Router
  ) { 
    this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.updateActiveLink(event.urlAfterRedirects);
    }
  }); }


  ngOnInit(): void {
    this.cartService.currentCartItems.subscribe(items => {
      this.cartItemCount = items.length;
      this.cartTotalPrice = items.reduce((total, item) => total + item.price, 0);
    });


    // Get Products
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });

  // Login Buttons Function
    this.buttonsService.loginButtonVisible$.subscribe(visible => {
      this.showLoginButton = visible;
    });
    this.buttonsService.signupButtonVisible$.subscribe(visible => {
      this.showSignupButton = visible;
    });

  }

  // Update Active Link
  updateActiveLink(url: string) {
    const link = url.split('/')[1];
    this.activeLink = link ? link : 'home';
  }

  // Close Cart Function
  onButtonClick() {
    this.cartClicked.emit();
  }

  // Search Product
  onSearchInputChange() {
    if (this.searchTerm.trim()) {
      this.productService.searchProducts(this.searchTerm).subscribe(results => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
    }
  }

  // Toggle Menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // View Product Details
  viewProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }
  
}
