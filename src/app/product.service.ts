import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private jsonUrl = 'assets/items.json'; 

  private products = [
    {
      "id": 0,
      "img": "assets/images/product/product1.jpg",
      "img_hover": "assets/images/product/product-1.jpg",
      "name": "Mobile Iphone 7 Plus 6RAM 64GB",
      "price": 185,
      "old_price": 225
  },
  {
      "id": 1,
      "img": "assets/images/product/product2.jpg",
      "img_hover": "assets/images/product/product-2.jpg",
      "name": "Mobile Samsung S5 4RAM 32GB",
      "price": 100,
      "old_price": 120
  },
  {
      "id": 2,
      "img": "assets/images/product/product3.jpg",
      "img_hover": "assets/images/product/product-3.jpg",
      "name": "Tornado FHD TV - 43 Inch (Black)",
      "price": 140,
      "old_price": 200
  },
  {
      "id": 3,
      "img": "assets/images/product/product4.jpg",
      "img_hover": "assets/images/product/product-4.jpg",
      "name": "P39 Bluetooth Wireless Ear Headphone (Black)",
      "price": 90,
      "old_price": 110
  },
  {
      "id": 4,
      "img": "assets/images/product/product5.jpg",
      "img_hover": "assets/images/product/product-5.jpg",
      "name": "E Stereo Headphone - Handfree  (White)",
      "price": 350,
      "old_price": 420
  },
  {
      "id": 5,
      "img": "assets/images/product/product6.jpg",
      "img_hover": "assets/images/product/product-6.jpg",
      "name": "Mobile Samsung S21 Ultra (Black)",
      "price": 115,
      "old_price": 235
  },
  {
      "id": 6,
      "img": "assets/images/product/product7.jpg",
      "img_hover": "assets/images/product/product-7.jpg",
      "name": "Mobile Iphone 6 Plus 4RAM 32GB",
      "price": 225,
      "old_price": 280
  },
  {
      "id": 7,
      "img": "assets/images/product/product8.jpg",
      "img_hover": "assets/images/product/product-8.jpg",
      "name": "Apple Smart Watch Ultra-8 (White)",
      "price": 150,
      "old_price": 200
  },
  {
      "id": 8,
      "img": "assets/images/product/product-1.jpg",
      "img_hover": "assets/images/product/product1.jpg",
      "name": "Original Mobile Android Dual SIM Smart Phone G3",
      "price": 180
  }
  ]

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }


  // Search Product
  searchProducts(term: string): Observable<any[]> {
    if (!term.trim()) {;
      
      return of([]);
    }
    return of(this.products.filter(product => product.name.toLowerCase().includes(term.toLowerCase())));
    
  }

  getProductById(id: number): any {
    return this.products.find(product => product.id === id) || null;
  }


}