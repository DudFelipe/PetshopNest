import { Body, CacheInterceptor, Controller, Get, HttpException, HttpStatus, Param, Post, UseInterceptors } from '@nestjs/common';
import { Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Md5 } from 'md5-typescript';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateCustomerContract } from 'src/modules/backoffice/contracts/customer/create-customer.contract';
import { CreateCustomerDto } from 'src/modules/backoffice/dtos/customer/create-customer.dto';
import { QueryDto } from 'src/modules/backoffice/dtos/query.dto';
import { Customer } from 'src/modules/backoffice/models/customer.model';
import { Result } from 'src/modules/backoffice/models/result.model';
import { User } from 'src/modules/backoffice/models/user.model';
import { AccountService } from 'src/modules/backoffice/services/account.service';
import { CustomerService } from 'src/modules/backoffice/services/customer.service';
import { UpdateCustomerContract } from '../contracts/customer/update-customer.contract';
import { QueryContract } from '../contracts/query.contract';
import { UpdateCustomerDto } from '../dtos/customer/update-customer.dto';

@Controller('v1/customers')
export class CustomerController
{
    constructor(private readonly accountService: AccountService,
        private readonly customerService: CustomerService)
    {


    }

    @Get()
    @UseInterceptors(CacheInterceptor)
    async getAll()
    {
        const customers = await this.customerService.findAll();
        return new Result(null, true, customers, null);
    }

    @Get(':document')
    async get(@Param('document') document)
    {
        const customer = await this.customerService.find(document);
        return new Result(null, true, customer, null);
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async post(@Body() model: CreateCustomerDto)
    {
        try
        {
            const password = await Md5.init(`${model.password}${process.env.SALT_KEY}`);

            const user = await this.accountService.create(new User(model.document, password, true, ['user']));

            const customer = new Customer(model.name, model.document, model.email, null, null, null, null, user);
            const res = await this.customerService.create(customer);

            return new Result('Cliente criado com sucesso!', true, res, null);
        }
        catch (error)
        {
            //Rollback manual
            throw new HttpException(new Result('Não foi possível realizar seu cadastro!', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post('query')
    @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
    async query(@Body() model: QueryDto)
    {
        const customers = await this.customerService.query(model);
        return new Result(null, true, customers, null);
    }

    @Put(':document')
    @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
    async put(@Param('document') document, @Body() model: UpdateCustomerDto)
    {
        try
        {
            await this.customerService.update(document, model);
            return new Result('Cliente alterado com sucesso!', true, model, null);
        }
        catch (error)
        {
            //Rollback manual
            throw new HttpException(new Result('Não foi possível alterar seu cadastro!', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}