import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from '../backoffice/backoffice.module';
import { OrderController } from './controllers/order.controller';
import { ProductController } from './controllers/product.controller';
import { OrderSchema } from './schemas/order.schema';
import { ProductSchema } from './schemas/product.schema';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Product',
                schema: ProductSchema,
            },
            {
                name: 'Order',
                schema: OrderSchema
            }
        ]),
        BackofficeModule
    ],
    controllers: [
        ProductController,
        OrderController
    ],
    providers: [
        ProductService,
        OrderService
    ]
})
export class StoreModule { }
