import { Get, Injectable, Post } from '@nestjs/common';
import { NestApplicationContext } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
//import { Transaction } from '@sp/schemas';
import { connection, Model } from 'mongoose';
import { transactionDto } from './transaction.dto';
import { Transaction } from '../transaction/transaction.interface';
import { AccountService } from '../account/account.service';
import { error } from 'console';

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

  async makeExternalTransaction(transactionDto: transactionDto) {
    let accNumber = transactionDto.accountNumberSender;
    let subtractedAmount = transactionDto.totalAmount;
    let current = await this.accountService.findAccountByNumber(accNumber);
    if( Number(current.balance) < Number(transactionDto.totalAmount)+5 || transactionDto.totalAmount > 50 ){
      return error;
    }
    let newTrFee = {
        Date : transactionDto.Date,
        transactionName : transactionDto.transactionName + " fee",
        credit : transactionDto.credit,
        debit : transactionDto.debit,
        totalAmount : 5,
        accountNumberSender : accNumber,
        accountNumberReceiver : null
    };
    
    current.updateBalance(-1 * subtractedAmount);
    let transaction = new this.transactionModel(transactionDto);
    let fee = new this.transactionModel(newTrFee);
    await fee.save();
    current.updateBalance(-5);
    return await transaction.save();
  }

}

