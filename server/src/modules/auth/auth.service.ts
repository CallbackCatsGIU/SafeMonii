import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dtos/auth.dto';
import { UserDto } from '../user/dtos/user.dto';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwtPayload.interface';
import { User } from '../user/user.interface';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) { }

  /**
   * Determines if the user credentials provided are correct
   * @param dto
   */
  async login(dto: AuthDto) {
    /* 
      TODO: Add your login logic here to return
      appropriate exceptions when a user/password
      is incorrect. In addition, if a user is found
      and credentials are correct, create a JWT token
      with the entire user object as the payload.
      
      Note: JWT open standard RFC 7519 recommends
      a payload object contain certain "claims".
      As such, it's recommended to create a property
      called "sub" in payload which maps to the user id.
    */

    let user = await this.usersService.findOneByEmail(dto.email);
    const payload : JwtPayload = { sub: user.studentId, email : user.email };
    return new Promise((resolve) => {

      user.checkPassword(dto.password, (err, isMatch) => {

        if (err) throw new UnauthorizedException();

        if (isMatch) {
          resolve(this.createJwtPayload(user));

        } else {
          throw new UnauthorizedException();
        }

      });

    });
  }

  createJwtPayload(user) {

    let data: JwtPayload = {
      sub: user.sub,
      email: user.email
    };

    let jwt = this.jwtService.sign(data);

    return {
      expiresIn: 3600,
      token: jwt
    }

  }
}
