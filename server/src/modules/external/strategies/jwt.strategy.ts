import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserDto } from 'src/modules/user/dtos/user.dto';
import { ExternalService } from '../external.service';

@Injectable()
export class JwtExternalStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private externalService : ExternalService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreException: true,
      secretOrKey: "My-Secret-Key",
    });
  }

  async validate(payload: any) {
    return { accountNum: payload.accountNum};
  }
  
}
