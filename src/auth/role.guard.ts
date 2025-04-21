import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector:Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean  {
    const requiredRoulse = this.reflector.getAllAndOverride(ROLES_KEY,[context.getHandler(),context.getClass()]) 
    if(!requiredRoulse){
        return true
    }
    try {
        const {user}=context.switchToHttp().getRequest()
        return requiredRoulse.some((role)=>user.roles?.includes(role))
    } catch (error) {
     throw new UnauthorizedException() 
    }
  
  }
}
