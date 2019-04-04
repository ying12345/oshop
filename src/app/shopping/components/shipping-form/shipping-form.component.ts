import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from 'shared/models/order';
import { Router } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { Subscription } from '../../../../../node_modules/rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
// import { Shipping} from '../models/shipping';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('cart') cart: ShoppingCart;
  shipping = {};
  userId: string;
  userSubscription: Subscription;


  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
  ) { }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    // this.shoppingCartService.clearCart();
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
