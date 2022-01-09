import { Get, HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { NestApplicationContext } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
//import { Transaction } from '@sp/schemas';
import { connection, Model } from 'mongoose';
import { Transaction } from '../transaction/transaction.interface';
import { AccountService } from '../account/account.service';
import { error } from 'console';
import { transactionDto } from '../transaction/transaction.dto';
import { JwtService } from '@nestjs/jwt';
import { externalJwtPayload } from './jwtPayload.interface';

@Injectable()
export class ExternalService {
  constructor(@InjectModel('Transaction') private transactionModel: Model<Transaction>, private accountService: AccountService, private jwtService: JwtService) { }


  async getExternalTransaction(body: any) {

    let accNumber = body.receiverAccountNumber;
    let addedAmount = body.amount;
    let description = body.description;
    let today = new Date().toLocaleDateString();

    let newTransaction = {
      Date: today,
      description: description + "(outer)",
      credit: true,
      debit: false,
      amount: addedAmount,
      senderAccountNumber: "External Bank",
      receiverAccountNumber: accNumber
    };

    let current = await this.accountService.findAccountByNumber(accNumber);
    if (!current) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Account Does Not Exist",
      }, HttpStatus.BAD_REQUEST);;
    }
    if (addedAmount > 50) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Invalid Amount',
      }, HttpStatus.BAD_REQUEST);;
    }
    current.updateBalance(addedAmount);
    let newTr = new this.transactionModel(newTransaction);
    return await newTr.save();
  }

  async errorRefund(body : any){
    let accNumber = body.senderAccountNumber;
    let addedAmount = body.amount;
    let description = body.description;   
    let newDescription = description + " fee";


    let current = await this.accountService.findAccountByNumber(accNumber);
    let failedTransaction = await this.transactionModel.deleteOne({senderAccountNumber : accNumber, amount : addedAmount, description : description});
    failedTransaction = await this.transactionModel.deleteOne({senderAccountNumber : accNumber, amount : 5, description : newDescription });
    current.updateBalance(addedAmount);
    current.updateBalance(5);
    
  }

  async makeExternalTransaction(body: any) {
    let accNumber = body.senderAccountNumber;
    let subtractedAmount = body.amount;
    let description = body.description;
    let today = new Date().toLocaleDateString();

    // let accNumber = transactionDto.senderAccountNumber;
    // let subtractedAmount = transactionDto.amount;
    let current = await this.accountService.findAccountByNumber(accNumber);
    if (!current) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Account Does Not Exist",
      }, HttpStatus.BAD_REQUEST);;
    }
    if (Number(current.balance) < Number(subtractedAmount) + 5 || subtractedAmount > 50) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Invalid Amount',
      }, HttpStatus.BAD_REQUEST);;
    }

    let newTrFee = {
      Date: today,
      description: description + " fee",
      credit: true,
      debit: false,
      amount: 5,
      senderAccountNumber: accNumber,
      receiverAccountNumber: null
    };

    current.updateBalance(-1 * subtractedAmount);
    //let transaction = new this.transactionModel(transactionDto);
    let currentTr = {
      Date: today,
      description: description,
      credit: true,
      debit: false,
      amount: subtractedAmount,
      senderAccountNumber: accNumber,
      receiverAccountNumber: "External Bank"
    };
    let transaction = new this.transactionModel(currentTr);
    let fee = new this.transactionModel(newTrFee);
    await transaction.save()
    current.updateBalance(-5);
    await fee.save();
    return new Promise((resolve) => {
      resolve(this.createJwtPayload(accNumber));
    });
  }

  createJwtPayload(data) {

    let x: externalJwtPayload = {
      accountNum: data
    };

    let external = this.jwtService.sign(x);

    return {
      expiresIn: 3600,
      token: external
    }

  }
}

