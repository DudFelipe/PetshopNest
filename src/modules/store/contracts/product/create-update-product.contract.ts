import { Injectable } from "@nestjs/common";
import { Contract } from "src/modules/backoffice/contracts/contract";
import { Flunt } from "src/utils/flunt";

@Injectable()
export class CreateUpdateProductContract implements Contract
{
    errors: any[];
    validate(model: any): boolean
    {
        const flunt = new Flunt();

        flunt.hasMaxLen(model.description, 4000, "A descrição deve possuir no máximo 4000 caracteres!");
        flunt.hasMaxLen(model.title, 80, "O título do produto deve possuir no máximo 80 caracteres!");
        flunt.hasMinLen(model.title, 3, "O título do produto deve possuir no mínimo 3 caracteres!");
        flunt.hasMinLen(model.description, 4, "A descrição do produto deve possuir no máximo 4 caracteres!");

        this.errors = flunt.errors;
        return flunt.isValid();
    }

}