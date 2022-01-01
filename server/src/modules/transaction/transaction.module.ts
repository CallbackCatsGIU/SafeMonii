import { Module } from '@nestjs/common';
import { TransactionController } from './transactions.controller';
import { TransactionService } from './transaction.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from '@sp/schemas';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Transaction', schema: TransactionSchema}]),
    AccountModule
  ],

  exports: [TransactionService],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}