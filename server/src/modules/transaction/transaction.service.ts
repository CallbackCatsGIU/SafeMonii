import { Get, HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
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

  async findTransactionSender(id): Promise<Transaction[]> {
    return await this.transactionModel.find({senderAccountNumber : id});

  }
  
  async findTransactionReceiver(id): Promise<Transaction[]> {
    return await this.transactionModel.find({receiverAccountNumber : id});

  }

  async newTransaction(transactionDto: transactionDto) {
    let transaction = new this.transactionModel(transactionDto);
    return await transaction.save();
  }
  
  async internalTransaction(body: any) {
    let sender = await this.accountService.findAccountByNumber(body.senderAccountNumber);
    let receiver = await this.accountService.findAccountByNumber(body.receiverAccountNumber);
    let addedAmount = body.amount;
    let description = body.description;
    let debit = body.debitCredit;
    let today = new Date().toLocaleDateString();
    if (!receiver) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Account Does Not Exist",
      }, HttpStatus.BAD_REQUEST);;
    }
    if(sender.balance < addedAmount){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Invalid amount',
      }, HttpStatus.BAD_REQUEST);;
    }
    let newTransaction = {
      Date: today,
      description: description,
      credit: !debit,
      debit: debit,
      amount: addedAmount,
      senderAccountNumber: body.senderAccountNumber,
      receiverAccountNumber: body.receiverAccountNumber
    };

    sender.updateBalance(-1 * addedAmount);
    receiver.updateBalance(addedAmount);
    let transaction = new this.transactionModel(newTransaction);

    return await transaction.save();
  }

}

