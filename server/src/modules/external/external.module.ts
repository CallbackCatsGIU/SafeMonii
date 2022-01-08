import { Module } from '@nestjs/common';
import { ExternalController } from './external.controller';
import { ExternalService } from './external.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from '@sp/schemas';
import { AccountModule } from '../account/account.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtExternalStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Transaction', schema: TransactionSchema}]),
    AccountModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    //PassportModule,
    JwtModule.register({
      secretOrPrivateKey: "My-Secret-Key",
      signOptions: {
        expiresIn: 3600
      }
    })
  ],

  exports: [ExternalService,JwtModule,PassportModule],
  controllers: [ExternalController],
  providers: [ExternalService, JwtExternalStrategy],
})
export class ExternalModule {}