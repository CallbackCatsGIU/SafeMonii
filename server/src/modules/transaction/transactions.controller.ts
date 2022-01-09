import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ObjectId } from 'mongoose';
import { transactionDto } from './transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) { }

  @Post('/newTransaction') 
  async createTransaction(@Body() transaction: transactionDto) {
      return await this.transactionService.newTransaction(transaction);
  }

  
  @Post('/newInternalTransaction')
  async createInternalTransaction(@Body() transaction: transactionDto){
      return await this.transactionService.internalTransaction(transaction);
  }

  @Get('/outerTransaction/:id')
  async outerTransaction(@Param('id') id: Number){
    return await this.transactionService.findTransactionSender(id);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Get('/innerTransaction/:id')
  async innerTransaction(@Param('id') id: Number){
    return await this.transactionService.findTransactionReceiver(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/transactionList/:id')
  async transaction(@Param('id') id: Number){
    return await this.transactionService.findTransaction(id);
  }
}