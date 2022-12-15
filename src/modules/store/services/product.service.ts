import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UpdateProductDto } from "../dtos/product/update-product.dto";
import { Product } from "../models/product.model";

@Injectable()
export class ProductService
{
    constructor(@InjectModel('Product') private readonly model: Model<Product>)
    {

    }

    async findAll(): Promise<Product[]>
    {
        return await this.model
            .find({})
            .sort('title')
            .exec();
    }

    async find(id: string): Promise<Product>
    {
        return await this.model.findById(id);
    }

    async create(data: Product): Promise<Product>
    {
        const product = new this.model(data);
        return await product.save();
    }

    async update(id: string, data: UpdateProductDto): Promise<Product>
    {
        return await this.model.findOneAndUpdate({ id }, data);
    }

    async delete(id: string): Promise<Product>
    {
        return await this.model.findOneAndDelete({ id });
    }
}