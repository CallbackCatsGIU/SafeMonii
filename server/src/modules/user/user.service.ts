import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { accountDto } from '../account/account.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './user.interface';
import { AccountService } from '../account/account.service';
import { Account } from '../account/account.interface';
import { AccountModule } from '../account/account.module';
import { UserSchema } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>,
  private accountService: AccountService) { }

  /**
   * Returns all users from mongo database
   */
  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async newUser(userDto: UserDto) {
    let user = new this.userModel(userDto);
    let accountDto =
    {
      balance: 100,
      active : true,
      accountNumber : Math.floor(Math. random() * (999999999999 - 0 + 1))+0,
      userId : user.getStudentId(user.id)
    };

    let account = this.accountService.newAccount(accountDto);
    (await account).save();
    return await user.save();
  }

  async findOneByEmail(email): Promise<User> {
    
    return await this.userModel.findOne({email: email});

  }

  async findOneWithEmail(email): Promise<User[]> {
    return await this.userModel.find({email: email});

  }
}
