import { Get, Injectable, Post } from '@nestjs/common';
import { NestApplicationContext } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
//import { Transaction } from '@sp/schemas';
import { connection, Model } from 'mongoose';
import { Transaction } from '../transaction/transaction.interface';
import { AccountService } from '../account/account.service';
import { error } from 'console';
import { transactionDto } from '../transaction/transaction.dto';

@Injectable()
export class ExternalService { 
  constructor(@InjectModel('Transaction') private transactionModel : Model<Transaction>, private accountService : AccountService) {}


  async getExternalTransaction(transactionDto: transactionDto) {
    let accNumber = transactionDto.receiverAccountNumber;
    let addedAmount = transactionDto.amount;
    let current = await this.accountService.findAccountByNumber(accNumber);
    current.updateBalance(addedAmount);
    let transaction = new this.transactionModel(transactionDto);
    return await transaction.save();
  }

  async makeExternalTransaction(transactionDto: transactionDto) {
    let accNumber = transactionDto.senderAccountNumber;
    let subtractedAmount = transactionDto.amount;
    let current = await this.accountService.findAccountByNumber(accNumber);
    if( Number(current.balance) < Number(transactionDto.amount)+5 || transactionDto.amount > 50 ){
      return error;
    }
    let newTrFee = {
        Date : transactionDto.Date,
        description : transactionDto.description + " fee",
        credit : transactionDto.credit,
        debit : transactionDto.debit,
        amount : 5,
        senderAccountNumber : accNumber,
        receiverAccountNumber : null
    };
    
    current.updateBalance(-1 * subtractedAmount);
    let transaction = new this.transactionModel(transactionDto);
    let fee = new this.transactionModel(newTrFee);
    await fee.save();
    current.updateBalance(-5);
    return await transaction.save();
  }

}

