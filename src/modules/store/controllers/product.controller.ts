import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseInterceptors } from '@nestjs/common';
import { Delete, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { QueryContract } from 'src/modules/backoffice/contracts/query.contract';
import { QueryDto } from 'src/modules/backoffice/dtos/query.dto';
import { Result } from 'src/modules/backoffice/models/result.model';
import { CreateUpdateProductContract } from '../contracts/product/create-update-product.contract';
import { CreateProductDto } from '../dtos/product/create-product.dto';
import { UpdateProductDto } from '../dtos/product/update-product.dto';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Controller('v1/products')
export class ProductController
{
    constructor(private readonly service: ProductService)
    {


    }

    @Get()
    async getAll()
    {
        const products = await this.service.findAll();
        return new Result(null, true, products, null);
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateUpdateProductContract()))
    async post(@Body() model: CreateProductDto)
    {
        try
        {
            const product = new Product(model.title, model.description, model.price, model.quantityOnHand);
            const res = await this.service.create(product);

            return new Result('Produto criado com sucesso!', true, res, null);
        }
        catch (error)
        {
            //Rollback manual
            throw new HttpException(new Result('Não foi possível realizar o cadastro do produto!', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    @UseInterceptors(new ValidatorInterceptor(new CreateUpdateProductContract()))
    async put(@Param('id') id, @Body() model: UpdateProductDto)
    {
        try
        {
            await this.service.update(id, model);
            return new Result('Produto alterado com sucesso!', true, model, null);
        }
        catch (error)
        {
            //Rollback manual
            throw new HttpException(new Result('Não foi possível alterar o produto!', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id)
    {
        try
        {
            await this.service.delete(id);
        }
        catch (error)
        {
            throw new HttpException(new Result('Não foi possível remover o produto!', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}