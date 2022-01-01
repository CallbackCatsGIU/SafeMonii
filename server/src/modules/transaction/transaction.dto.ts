import {  IsNotEmpty } from 'class-validator';

export class transactionDto {
  Date: Date;
  transactionName: String;
  credit:  Boolean;
  debit: Boolean;
  totalAmount : number;
  accountNumberReceiver : Number;
  accountNumberSender : Number;

}