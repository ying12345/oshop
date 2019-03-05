import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from '../../node_modules/angularfire2/database';
import { Product } from './models/product';
import { ShoppingCart} from './models/shopping-cart';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {          //  decorate the function with "async".
    const cartId = localStorage.getItem('cartId');
    // Problem:  No code to remove 'cartId' from local storage.
    if (!cartId) {
      const result = await this.create(); // "await" operator allows you to use async method as synchr method.
      localStorage.setItem('cartId', result.key);
      console.log('create shopping-carts in db:' + result);
      return result.key;
    }
    return cartId;
  }

  private async updateItemQuantity(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.$key);

    item$.pipe(take(1)).subscribe(item => {
      item$.update( {product: product, quantity: (item.quantity || 0) + change} );
    });
  }

  create () {
    // Problem: Looks like it never runs this code because 'cartId' always in localStorage.
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  async getCart(): Promise<FirebaseObjectObservable<ShoppingCart>> {
    // console.log('getCart from db:' + this.db.object('/cartts/' ));
    const cartId = await this.getOrCreateCartId();
    // console.log('cartId:' + cartId);

    // After deleting the 'shopping-carts' in database, following line still returns a object.
    // Problem: Actually it always returns an object.
    return this.db.object('/shopping-carts/' + cartId);
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

}
