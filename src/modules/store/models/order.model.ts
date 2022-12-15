import { Customer } from "src/modules/backoffice/models/customer.model";
import { OrderItem } from "./order-item.model";
import { Product } from "./product.model";

export class Order
{
    constructor(
        public number: string,
        public date: Date,
        public customer: Customer,
        public items: OrderItem[],
        public total: number
    )
    {

    }
}