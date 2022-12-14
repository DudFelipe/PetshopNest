import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.yoklq9n.mongodb.net/petshopNestApi?retryWrites=true&w=majority'),
    BackofficeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
