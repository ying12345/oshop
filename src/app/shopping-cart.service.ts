import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../node_modules/angularfire2/database';

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

  private getOrCreate(){
    let cartId = localStorage.getItem('cartId');
    console.log(cartId);
    if (!cartId) {
      this.create().then(result => {
        localStorage.setItem('cartId', result.key);
        return this.getCart(result.key);
      });
    } else {
      return this.getCart(cartId);
    }
  }
}
