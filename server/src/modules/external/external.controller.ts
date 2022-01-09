import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ObjectId } from 'mongoose';
import { transactionDto } from '../transaction/transaction.dto';
import { ExternalService } from './external.service';

@Controller('external')
export class ExternalController {
  constructor(private externalService: ExternalService) { }

 
  @Post('/createTransfer')
  async createExternalTransaction(@Body() transaction: transactionDto) {
    return await this.externalService.makeExternalTransaction(transaction);
  }

  @Post('/refund')
  async refund(@Body() transaction: transactionDto) {
    return await this.externalService.errorRefund(transaction);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/transfer')
  async getExternalTransaction(@Body() transaction: transactionDto) {
    return await this.externalService.getExternalTransaction(transaction);
  }

}