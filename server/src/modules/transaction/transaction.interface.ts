import * as mongoose from 'mongoose';
export interface Transaction { 
  Date: Date;
  description: String;
  credit:  Boolean;
  debit: Boolean;
  amount : number;
  receiverAccountNumber : String;
  senderAccountNumber : String;

}