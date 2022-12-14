import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreditCard } from "../models/credit-card.model";
import { Customer } from "../models/customer.model";

@Injectable()
export class CreditCardService
{
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>)
    {

    }

    async saveOrUpdateCreditCard(document: string, data: CreditCard): Promise<Customer>
    {
        const options = { upsert: true };
        return await this.model.findOneAndUpdate({ document }, {
            $set:{
                card: data,
            }
        }, options);
    }
}