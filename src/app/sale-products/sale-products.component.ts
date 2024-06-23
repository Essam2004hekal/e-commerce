import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
declare var $: any; // Declare jQuery

@Component({
  selector: 'app-sale-products',
  templateUrl: './sale-products.component.html',
  styleUrls: ['./sale-products.component.css']
})
export class SaleProductsComponent implements OnInit, AfterViewInit {
  products: any[] = [];

  constructor(
    private productService: ProductService, private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any[]) => {
      console.log("products fetched", data);
      this.products = data.filter(product => product.old_price);
      this.initializeCarousel();
    }, error => {
      console.error("Error fetching", error);
    });
  }

  ngAfterViewInit(): void {
    // Carousel initialization moved to initializeCarousel method
  }

  initializeCarousel(): void {
    setTimeout(() => {
      $('#carousel-2').owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        responsive: {
          0: {
            items: 2
          },
          600: {
            items: 3
          },
          1000: {
            items: 5
          }
        }
      });
    }, 0);
  }

  // Cart Functions
getDiscountPercentage(oldPrice: number, currentPrice: number): string {
    if (oldPrice <= currentPrice) {
      return '0%';
    }
    const discount = ((oldPrice - currentPrice) / oldPrice) * 100;
    return `${Math.floor(discount)}%`;
  }

  addToCart(product: any) {
    this.cartService.addToCart(product)
  }

  
  // View Product Details
  viewProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

}
