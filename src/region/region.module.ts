import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Region, RegionSchema } from './entities/region.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports:[MongooseModule.forFeature([{ name: Region.name, schema: RegionSchema }])],
  controllers: [RegionController],
  providers: [RegionService,{provide: APP_GUARD,
    useClass: AuthGuard,}],
})
export class RegionModule {}
