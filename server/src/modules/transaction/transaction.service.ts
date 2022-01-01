import { Get, Injectable, Post } from '@nestjs/common';
import { NestApplicationContext } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
//import { Transaction } from '@sp/schemas';
import { connection, Model } from 'mongoose';
import { transactionDto } from './transaction.dto';
import { Transaction } from '../transaction/transaction.interface';
import { accountDto } from '../account/account.dto';
import { AccountService } from '../account/account.service';

@Injectable()
export class TransactionService { 
  constructor(@InjectModel('Transaction') private transactionModel : Model<Transaction> , private accountService : AccountService) {}
  
  findAll(): Promise<Transaction[]> {
    return this.transactionModel.find().exec();
  }

  async findTransaction(id): Promise<Transaction[]> {
    return await this.transactionModel.find({accountNumber : id});

  }

  async newTransaction(transactionDto: transactionDto) {
    let transaction = new this.transactionModel(transactionDto);
    return await transaction.save();
  }

  async InternalTransaction(transactionDto : transactionDto) {
    let sender = await this.accountService.findAccountByNumber(transactionDto.accountNumberSender);
    let receiver = await this.accountService.findAccountByNumber(transactionDto.accountNumberReceiver);
    if(sender.balance < transactionDto.totalAmount || sender.balance <= 0){
      alert("Transaction cannot be done");
    }
    else{
      sender.updateBalance(-1 * transactionDto.totalAmount);
      receiver.updateBalance(transactionDto.totalAmount);
    }
    let transaction = new this.transactionModel(transactionDto);

    return await transaction.save();
  }

}
