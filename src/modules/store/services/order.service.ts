import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OrderItem } from "../models/order-item.model";
import { Order } from "../models/order.model";

@Injectable()
export class OrderService
{
    constructor(@InjectModel('Order') private readonly model: Model<Order>)
    {

    }

    async getByNumber(number: string): Promise<Order>
    {
        return await this.model.findOne({ number }).populate('customer').populate('orderItem');
    }

    async getByCustomer(customer: string): Promise<Order[]>
    {
        return await this.model.find({ customer });
    }

    async post(data: Order): Promise<Order>
    {
        const order = new this.model(data);
        return await order.save();
    }

    async createOrderItem(numberOrder: string, data: OrderItem): Promise<Order>
    {
        const options = { upsert: true, new: true };
        return await this.model.findOneAndUpdate({ numberOrder }, {
            $push: {
                items: data,
            },

        }, options);
    }
}