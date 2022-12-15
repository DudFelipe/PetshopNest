import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Post } from "@nestjs/common";
import { Result } from "src/modules/backoffice/models/result.model";
import { CustomerService } from "src/modules/backoffice/services/customer.service";
import { OrderDto } from "../dtos/order-item/order.dto";
import { OrderItem } from "../models/order-item.model";
import { Order } from "../models/order.model";
import { OrderService } from "../services/order.service";
import { ProductService } from "../services/product.service";

@Controller('v1/orders')
export class OrderController
{
    constructor(
        private readonly orderService: OrderService,
        @Inject(CustomerService) private readonly customerService: CustomerService,
        private readonly productService: ProductService
    )
    {

    }

    @Get(':order')
    async get(@Param('order') order: string)
    {
        try
        {
            const orders = await this.orderService.getByNumber(order);
            return new Result(null, true, orders, null);
        }
        catch (error)
        {
            throw new HttpException(new Result('Não foi possível listar a sua compra!', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':customer')
    async getByCustomer(@Param('customer') customer: string)
    {
        try
        {
            const orders = await this.orderService.getByCustomer(customer);
            return new Result(null, true, orders, null);
        }
        catch (error)
        {
            throw new HttpException(new Result('Não foi possível listas as suas compras!', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async post(@Body() model: OrderItem[])
    {
        try
        {
            let order = new Order(
                '1B2D3F5',
                new Date(),
                await this.customerService.find('12345678911'), //Vem do token (JWT)
                model,
                0
            );

            for(const orderItem of model)
            {
                let product = await this.productService.find(orderItem.product);

                orderItem.price = product.price;
            }

            await this.orderService.post(order);
            return new Result(null, true, model, null);
        }
        catch (error)
        {
            throw new HttpException(new Result('Não foi possível concluir sua compra!', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}