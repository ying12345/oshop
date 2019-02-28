import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {
  @Input('product') product:Product;
  @Input('show-actions') showActions=true;
  constructor(private cartService: ShoppingCartService) { }

  addToCart(product:Product){
    console.log('Click');
    let cartId = localStorage.getItem('cartId');
    console.log(cartId);
    if (!cartId) {
      console.log('!cartId');
      this.cartService.create().then(result => {
        localStorage.setItem('cartId', result.key);
        console.log(result);
        // Add product to cart
      });
    } else {
      // Add product to cart
    }
  }


}
