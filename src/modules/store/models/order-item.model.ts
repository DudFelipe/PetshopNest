import { Product } from "./product.model";

export class OrderItem
{
    constructor(
        public product: string,
        public price: number,
        public quantity: number
    )
    {

    }
}