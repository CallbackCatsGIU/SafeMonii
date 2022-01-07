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
  constructor(@InjectModel('Transaction') private transactionModel : Model<Transaction>, private accountService : AccountService, private jwtService: JwtService) {}


  async getExternalTransaction(transactionDto: transactionDto) {
   // const user = await this.jwtService.verify(token);

    let accNumber = transactionDto.receiverAccountNumber;
    let addedAmount = transactionDto.amount;
    let current = await this.accountService.findAccountByNumber(accNumber);
    if(!current){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Account doesn't exist",
      }, HttpStatus.BAD_REQUEST);;
    }
    current.updateBalance(addedAmount);
    let transaction = new this.transactionModel(transactionDto);
    return await transaction.save();
  }

  async makeExternalTransaction(transactionDto: transactionDto) {
    let accNumber = transactionDto.senderAccountNumber;
    let subtractedAmount = transactionDto.amount;
    let current = await this.accountService.findAccountByNumber(accNumber);
    if( Number(current.balance) < Number(transactionDto.amount)+5 || transactionDto.amount > 50 ){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Invalid Amount',
      }, HttpStatus.BAD_REQUEST);;
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
    await transaction.save()
    return new Promise((resolve) => {
      resolve(this.createJwtPayload(accNumber));
    });
  }

  createJwtPayload(data) {

    let x: externalJwtPayload = {
      accountNum : data
    };

    let external = this.jwtService.sign(x);

    return {
      expiresIn: 3600,
      token: external
    }

  }
}

