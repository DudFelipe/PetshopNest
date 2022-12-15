export class CreateProductDto
{
    constructor(
        public title: string,
        public description: string,
        public price: number,
        public quantityOnHand: number
    )
    {


    }
}