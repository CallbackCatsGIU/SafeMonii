import {  IsNotEmpty } from 'class-validator';

export class accountDto {
    
  balance : number;
  accountNumber : String;
  active : boolean;
  userId: Number;
}