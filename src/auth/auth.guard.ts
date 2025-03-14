import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt:JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean  {
    
    
    let request:Request=context.switchToHttp().getRequest()
    let token = request.headers.authorization?.split(" ")[1]
    console.log(token);
    
    if(!token) throw new UnauthorizedException()
    try {
      let data = this.jwt.verify(token)
      console.log("hi");
      
      request['user']=data.id
      console.log(request['user']);
      
      return true;
    } catch (error) {
      throw new UnauthorizedException()
    }
  
  }
}
