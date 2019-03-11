import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService} from '../shopping-cart.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    console.log('add:'+ this.product);
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    console.log('remove'+ this.product);
    this.cartService.removeFromCart(this.product);
    
  }

}
