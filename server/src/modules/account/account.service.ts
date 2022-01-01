import { Injectable} from '@nestjs/common';
import { NestApplicationContext } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { accountDto } from './account.dto'
import { Account } from '../account/account.interface';

@Injectable()
export class AccountService {
  constructor(@InjectModel('Account') private accountModel: Model<Account>) {}
  
  findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }
  //FIND ACCOUNT BY ID
  async findAccountById(id): Promise<Account[]> {
    return await this.accountModel.find({userId: id});

  }
  async newAccount(accountDto: accountDto) {
    let account = new this.accountModel(accountDto);
    return await account.save();
  }

  async findAccountByNumber(accountNumber): Promise<Account[]> {
    return await this.accountModel.find({accountNumber: accountNumber});

  }
}
