import {  IsNotEmpty } from 'class-validator';

export class accountDto {
    
  balance : Number;
  accountNumber : Number;
  active : boolean;
  userId: Number;
}