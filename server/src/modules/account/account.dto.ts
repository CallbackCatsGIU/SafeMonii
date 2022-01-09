import {  IsNotEmpty } from 'class-validator';

export class accountDto {
    
  balance : number;
  accountNumber : Number;
  active : boolean;
  userId: Number;
}