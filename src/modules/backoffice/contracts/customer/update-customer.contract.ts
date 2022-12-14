import { Injectable } from "@nestjs/common";
import { Flunt } from "src/utils/flunt";
import { CreateCustomerDto } from "src/modules/backoffice/dtos/customer/create-customer.dto";
import { Contract } from "src/modules/backoffice/contracts/contract";
import { UpdateCustomerDto } from "../../dtos/customer/update-customer.dto";

@Injectable()
export class UpdateCustomerContract implements Contract
{

    errors: any[];
    validate(model: UpdateCustomerDto): boolean
    {
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 5, 'O nome deve ter pelo menos 5 caracteres!');

        this.errors = flunt.errors;

        return flunt.isValid();
    }
}