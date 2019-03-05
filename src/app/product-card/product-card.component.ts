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
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    // Reurns '0' when waitting for getting 'this.shoppingCart'.
    if (!this.shoppingCart) {
      return 0;
    } else {
    // When there is no 'shopping-carts' in database,
    // 'cart'([shopping-cart]='cart') still returns an object. But this.shoppingCart.items is undefined.
    let item = this.shoppingCart.items[this.product.$key]; // If shopping-carts has date-created atttribute this.shoppingCart.items will be undefined.
    return item ? item.quantity : 0;
    }
  }


}
