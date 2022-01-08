import {  IsNotEmpty } from 'class-validator';

export class transactionDto {
  Date: Date;
  description: String;
  credit:  Boolean;
  debit: Boolean;
  amount : number;
  receiverAccountNumber : String;
  senderAccountNumber : String;

}