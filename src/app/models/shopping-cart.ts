import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];
    constructor(public itemsMap: { [productId: string]: ShoppingCartItem}) { //items actually is not an array it is a map.
        for (let productId in this.itemsMap)
            this.items.push(this.itemsMap[productId]);
}

    get totalItemCount( ) {
        let count = 0;
        for ( let productId in this.itemsMap)
            count += this.itemsMap[productId].quantity;
        return count;
    }
}
