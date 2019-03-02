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

  private async getOrCreate(){          //  decorate the function with "async".
    let cartId = localStorage.getItem('cartId');
    console.log(cartId);
    if (!cartId) {
      let result = await this.create(); // "await" operator allows you to use async method as synchr method.
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
    return cartId;
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreate();
    let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.$key);

    item$.pipe(take(1)).subscribe(item => {      // item$.take(1).subscribe()  //error: item$.take is not a function.
      if (item.$exists()) {item$.update( {quantity:item.quantity + 1} ); }
      else {item$.set({product: product, quantity: 1});}
    });

  }
}
