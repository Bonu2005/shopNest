import { Module } from '@nestjs/common';
import { AdvertismentService } from './advertisment.service';
import { AdvertismentController } from './advertisment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Advertisment, AdvertismentSchema } from './entities/advertisment.entity';

@Module({
  imports:[MongooseModule.forFeature([{ name:Advertisment.name, schema:AdvertismentSchema }])],
  controllers: [AdvertismentController],
  providers: [AdvertismentService],
})
export class AdvertismentModule {}
