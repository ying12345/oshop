import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from '../../../../node_modules/angularfire2/database';
import { Product } from '../models/product';
import { ShoppingCart} from '../models/shopping-cart';
import { take, map } from 'rxjs/operators';
import { Observable} from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
    .pipe( map( x => new ShoppingCart(x.items)) );
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    // tslint:disable-next-line:prefer-const
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove(); // It does not remove 'cartId' in localStorage.
    console.log('localStorage after clearCart', localStorage.getItem('cartId'));
  }

  private create () {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      const result = await this.create(); // "await" operator allows you to use async method as synchr method.
      localStorage.setItem('cartId', result.key);
      console.log('create shopping-carts in db:' + result);
      return result.key;
    }
    return cartId;
  }

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.$key);
    item$.pipe(take(1)).subscribe(item => {
      const quantity = (item.quantity || 0) + change;
      if (quantity === 0) { item$.remove(); } else { item$.update( {
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity,
      } );
      }
    });
  }


}
