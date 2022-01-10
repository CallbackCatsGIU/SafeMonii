import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  
  /**
   * API endpoint handler returns the authenticated user from JWT payload
   */    
  

  /**
   * API endpoint handler returns all users from mongo database
   */
  
  //@UseGuards(AuthGuard('jwt'))
  // @Get('list')
  // users(): any {
  //   return this.userService.findAll();
  // }
  
  @UseGuards(AuthGuard('jwt'))
  @Get('/email/:email')
  async getByEmail(@Param('email') email: String) {
    return await this.userService.findOneWithEmail(email);
  }

  @Post('register') 
  async create(@Body() register: UserDto) {
      return await this.userService.newUser(register);
  }
}
