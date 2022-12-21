import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseInterceptors } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateAddressContract } from 'src/modules/backoffice/contracts/address/create-address.contract';
import { Address } from 'src/modules/backoffice/models/address.model';
import { Result } from 'src/modules/backoffice/models/result.model';
import { AddressType } from '../enums/address-type.enum';
import { AddressService } from '../services/address.service';

@Controller('v1/addresses')
export class AddressController {
    constructor(private readonly service: AddressService) {


    }

    @Post(':document/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addBillingAddress(@Param('document') document, @Body() model: Address) {
        try {
            await this.service.create(document, model, AddressType.BILLING);
            return new Result(null, true, model, null);
        }
        catch (error) {
            throw new HttpException(new Result('Não foi possível adicionar seu endereço', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShippingAddress(@Param('document') document, @Body() model: Address) {
        try {
            await this.service.create(document, model, AddressType.SHIPPING);
            return new Result(null, true, model, null);
        }
        catch (error) {
            throw new HttpException(new Result('Não foi possível adicionar seu endereço', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get('search/:zipcode')
    async search(@Param('zipcode') zipcode) {
        try{
            const response = await this.service.getAddressByZipCode(zipcode).toPromise();
            return new Result(null, true, response.data, null);
        } catch(error){
            throw new HttpException(new Result('Não foi possível localizar seu endereço', false, null, error), HttpStatus.BAD_REQUEST);
        }
        
    }
} 