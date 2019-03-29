import { ShoppingCart} from './shopping-cart';

export class Order {
    datePlaced: number;
    items: any[];

    constructor(public userId: string, public shipping: any, private shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();

        this.items = this.shoppingCart.items.map(i => {
            return {
            product: {
                title: i.title,
                price: i.price,
                imageUrl: i.imageUrl,
            },
            quantity: i.quantity,
            totalPrice: i.totalPrice
            };
        });
        delete(this.shoppingCart);
    }
}
