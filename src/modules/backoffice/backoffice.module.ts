import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { CustomerController } from 'src/modules/backoffice/controllers/customer.controller';
import { AddressController } from './controllers/address.controller';
import { PetController } from './controllers/pet.controller';
import { CustomerSchema } from 'src/modules/backoffice/schemas/customer.schema';
import { UserSchema } from 'src/modules/backoffice/schemas/user.schema';
import { AccountService } from 'src/modules/backoffice/services/account.service';
import { CustomerService } from 'src/modules/backoffice/services/customer.service';
import { AddressService } from './services/address.service';
import { PetService } from './services/pet.service';
import { CreditCardService } from './services/credit-card.service';
import { CreditCardController } from './controllers/credit-card.controller';

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: 'Customer',
            schema: CustomerSchema,
        },
        {
            name: 'User',
            schema: UserSchema
        },
    ])],
    controllers: [
        CustomerController, 
        AddressController,
        CreditCardController,
        PetController
    ],
    providers: [
        AccountService,
        CustomerService,
        AddressService,
        CreditCardService,
        PetService
    ]
})
export class BackofficeModule { }
