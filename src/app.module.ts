import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';
import { StoreModule } from 'src/modules/store/store.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.yoklq9n.mongodb.net/petshopNestApi?retryWrites=true&w=majority'),
    BackofficeModule,
    StoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
