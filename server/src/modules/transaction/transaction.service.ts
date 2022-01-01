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
    let transaction = new this.transactionModel(transactionDto);
    let sender = this.accountService.findAccountByNumber(transactionDto.accountNumberSender);
    let receiver = this.accountService.findAccountByNumber(transactionDto.accountNumberReceiver);
    (await sender).updateBalance(-1 * transactionDto.totalAmount);
    (await receiver).updateBalance(transactionDto.totalAmount);

    return await transaction.save();
  }

}

    
   /*
    _isPositive(amount: number): boolean{
      
      const isPositive = amount > 0;
      if(!isPositive){
        console.error('Amount Must be Positive');
        return false;
      }
      return true;
    }

    _isAllowed(amount: number , account : accountDto): boolean{
      if(!this._isPositive(amount))
        return false;
      const isAllowed = account.totalAmount - amount >= 0;
      if(!isAllowed){
        console.error('You have insufficient funds!');
        return false;
      }
      return true;  
    }
  
    getLedgerDate(account : Account): string {

      let options: Intl.DateTimeFormatOptions = {
          day: "numeric", month: "numeric", year: "numeric",
          hour: "2-digit", minute: "2-digit"
      };

      return account.date.toLocaleDateString("en-GB", options) + " " + account.date.toLocaleTimeString("en-GB", options);
   }
   
   getTheDeposite(amount : number , account : Account): boolean {
     if(this._isPositive(amount)){
       account.balance += amount;
       console.info(`Deposite: ${account.active , account.id} new balance is ${account.balance}`);
       return true;
     }
     return false;
   }
   withDraw(amount : number , account : accountDto ) : boolean{
     if(this._isAllowed(amount , account)){
        account.totalAmount -= amount;
       console.info(`Withdraw: ${this.accountModel , this.accountModel} new balance is ${this.accountModel}`)
       return true;
     }
     return false;
   }
   MakeTransaction(amount: number , account : accountDto) : boolean{ 
     this.withDraw(amount , account); 
     account.totalAmount += amount;
     return true; 
   }*/
   /*function Account(name:string , balance : number) {

     this.name = name;
     this.balance = balance;
     
   }*/


  // TODO: Define your Transaction Service Logic