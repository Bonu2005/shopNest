import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { CommentModule } from './comment/comment.module';
import { ColorModule } from './color/color.module';
import { RegionModule } from './region/region.module';
import { CategoryModule } from './category/category.module';
import { AdvertismentModule } from './advertisment/advertisment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadsModule } from './uploads/uploads.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

@Module({
  
  imports: [UserModule, OrderModule, CommentModule, ColorModule, RegionModule, CategoryModule, AdvertismentModule,MongooseModule.forRoot("mongodb://localhost:27017/shop"), UploadsModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
