import { OrderItem } from "../../models/order-item.model";

export class OrderDto
{
    constructor(
        public products: OrderItem[],
    ) {
        
    }
}