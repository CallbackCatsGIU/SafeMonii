import { Get, Injectable, Post } from '@nestjs/common';
import { NestApplicationContext } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
//import { Transaction } from '@sp/schemas';
import { connection, Model } from 'mongoose';
import { transactionDto } from './transaction.dto';
import { Transaction } from '../transaction/transaction.interface';
import { AccountService } from '../account/account.service';

@Injectable()
export class TransactionService { 
  constructor(@InjectModel('Transaction') private transactionModel : Model<Transaction>, private accountService : AccountService) {}
  
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

  async getExternalTransaction(transactionDto: transactionDto) {
    let accNumber = transactionDto.accountNumberReceiver;
    let addedAmount = transactionDto.totalAmount;
    let current = await this.accountService.findAccountByNumber(accNumber);
    current.updateBalance(addedAmount);
    let transaction = new this.transactionModel(transactionDto);
    return await transaction.save();
  }

  // async makeExternalTransaction(transactionDto: transactionDto) {
  //   let accNumber = transactionDto.accountNumberReceiver;
  //   let addedAmount = transactionDto.totalAmount;
  //   let current = await this.accountService.findAccountByNumber(accNumber);
  //   current.updateBalance(addedAmount);
  //   let transaction = new this.transactionModel(transactionDto);
  //   return await transaction.save();
  // }

}

