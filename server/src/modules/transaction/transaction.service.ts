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
  
  async internalTransaction(transactionDto : transactionDto) {
    let sender = await this.accountService.findAccountByNumber(transactionDto.senderAccountNumber);
    let receiver = await this.accountService.findAccountByNumber(transactionDto.receiverAccountNumber);
    if(sender.balance < transactionDto.amount || sender.balance <= 0){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Transaction cannot be done',
      }, HttpStatus.BAD_REQUEST);;
      //console.log("Transaction cannot be done");
    }
    else{
        sender.updateBalance(-1 * transactionDto.amount);
        receiver.updateBalance(transactionDto.amount);
    }
    let transaction = new this.transactionModel(transactionDto);

    return await transaction.save();
  }

}

