import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../node_modules/angularfire2/database';
import { Product } from './models/product';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }
  create () {
    // Problem: Looks like it never runs this code because 'cartId' always in localStorage.
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  async getCart() {
    // console.log('getCart from db:' + this.db.object('/cartts/' ));
    const cartId = await this.getOrCreateCartId();

    // After deleting the 'shopping-carts' in database, following line still returns a object.
    // Problem: Actually it always returns an object.
    return this.db.object('/shopping-carts/' + cartId);
  }

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

  async addToCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.$key);

    item$.pipe(take(1)).subscribe(item => {      // item$.take(1).subscribe()  //error: item$.take is not a function.
      item$.update( {product: product, quantity: (item.quantity || 0) + 1} );
    });

  }
}
