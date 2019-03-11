import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';


export class ShoppingCart {
    items: ShoppingCartItem[] = [];
    constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || {};
        // tslint:disable-next-line:forin
        for (let productId in itemsMap) {
            let item = itemsMap[productId];
            let x = new ShoppingCartItem();
            Object.assign(x, item);
            x.$key = productId;
            this.items.push(x);
        }
    }

    getQuantity(product: Product) {
        console.log('product', product);
        let item = this.itemsMap[product.$key];
        return item ? item.quantity : 0;
        }

    get totalPrice() {
        let sum = 0;
        // tslint:disable-next-line:forin
        for (let productId in this.items) {
          sum += this.items[productId].totalPrice;
        }
        return sum;

    }
    get totalItemCount( ) {
        let count = 0;
        for ( let productId in this.itemsMap)
            count += this.itemsMap[productId].quantity;
        return count;
    }
}
