import {  IsNotEmpty } from 'class-validator';

export class transactionDto {
  date: Date;
  transactionName: String;
  credit:  Boolean;
  debit: Boolean;
  totalAmount : number;
  id:number;

}
