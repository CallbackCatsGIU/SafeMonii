import { Module } from '@nestjs/common';
import { ExternalController } from './external.controller';
import { ExternalService } from './external.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from '@sp/schemas';
import { AccountModule } from '../account/account.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Transaction', schema: TransactionSchema}]),
    AccountModule,
    PassportModule.register({ defaultStrategy: 'external', session: false }),
    JwtModule.register({
      secretOrPrivateKey: "My_Secret_Key",
      signOptions: {
        expiresIn: 3600
      }
    })
  ],

  exports: [ExternalService,JwtModule,PassportModule],
  controllers: [ExternalController],
  providers: [ExternalService, JwtStrategy],
})
export class ExternalModule {}