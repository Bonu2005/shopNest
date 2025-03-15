import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: 'humburger',
      signOptions: { expiresIn: '1h' }
    })
  ],
  controllers: [UserController],
  providers: [UserService], 
  exports: [MongooseModule, UserService] 
})
export class UserModule {}
