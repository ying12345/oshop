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
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  private getCart(cartId: string) {
    return this.db.object('/shopping-carts' + cartId);
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreate(){          //  decorate the function with "async".
    const cartId = localStorage.getItem('cartId');

    if (!cartId) {
      const result = await this.create(); // "await" operator allows you to use async method as synchr method.
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
    return cartId;
  }

  async addToCart(product: Product) {
    const cartId = await this.getOrCreate();
    const item$ = this.getItem(cartId, product.$key);

    item$.pipe(take(1)).subscribe(item => {      // item$.take(1).subscribe()  //error: item$.take is not a function.
      item$.update( {product: product, quantity: (item.quantity || 0) + 1} );
      console.log(item.quantity);
    });

  }
}
