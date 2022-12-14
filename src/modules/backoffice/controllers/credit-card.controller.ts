import { Body, Controller, HttpException, HttpStatus, Param, Post, UseInterceptors } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateCustomerContract } from 'src/modules/backoffice/contracts/customer/create-customer.contract';
import { Result } from 'src/modules/backoffice/models/result.model';
import { CreditCard } from '../models/credit-card.model';
import { CreditCardService } from '../services/credit-card.service';

@Controller('v1/credit-cards')
export class CreditCardController
{
    constructor(private readonly service: CreditCardService)
    {


    }

    @Post(':document')
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async createCreditCard(@Param('document') document, @Body() model: CreditCard)
    {
        try
        {
            await this.service.saveOrUpdateCreditCard(document, model);
            return new Result('Cliente criado com sucesso!', true, model, null);
        }
        catch (error)
        {
            throw new HttpException(new Result('Não foi possível realizar seu cadastro!', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}