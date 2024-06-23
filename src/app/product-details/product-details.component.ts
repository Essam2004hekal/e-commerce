import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  isComponentVisible :boolean = false; // Cart Default Value

  product: any;
  bigImage: string = '';

  constructor(
    private route: ActivatedRoute, private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        const productId = +idParam;
        if (!isNaN(productId)) {
          this.product = this.productService.getProductById(productId);
          if (this.product) {
            this.bigImage = this.product.img; // Put main img
          }
        } else {
          console.error('Invalid product ID');
        }
      } else {
        console.error('Product ID is null');
      }
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


  // Add To Cart
  addToCart(product: any) {
    this.cartService.addToCart(product)
  }

   // Update img
    updateBigImage(image: string) {
    this.bigImage = image;
  }

}
