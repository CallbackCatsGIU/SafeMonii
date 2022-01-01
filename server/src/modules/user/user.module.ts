// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { User, UserSchema } from '@sp/schemas';
// import { UserController } from './user.controller';
// import { UserService } from './user.service';

// @Module({
//   imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
//   exports: [UserService],
//   controllers: [UserController],
//   providers: [UserService],
// })
// export class UsersModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from '../schemas/user.schema';
import { AccountService } from '../account/account.service';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    AccountModule
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService]
})
export class UsersModule {}