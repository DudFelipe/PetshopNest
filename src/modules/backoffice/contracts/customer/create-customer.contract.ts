import { Injectable } from "@nestjs/common";
import { Flunt } from "src/utils/flunt";
import { CreateCustomerDto } from "src/modules/backoffice/dtos/customer/create-customer.dto";
import { Contract } from "src/modules/backoffice/contracts/contract";

@Injectable()
export class CreateCustomerContract implements Contract
{

    errors: any[];
    validate(model: CreateCustomerDto): boolean
    {
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 5, 'O nome deve ter pelo menos 5 caracteres!');
        flunt.isEmail(model.email, 'Email inválido!');
        flunt.isFixedLen(model.document, 11, 'CPF inválido!');
        flunt.hasMinLen(model.password, 6, 'A senha deve ter pelo menos 6 caracteres!');


        this.errors = flunt.errors;

        return flunt.isValid();
    }
}