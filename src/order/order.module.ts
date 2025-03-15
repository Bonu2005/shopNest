import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { UserModule } from 'src/user/user.module';
import { AdvertismentModule } from 'src/advertisment/advertisment.module';

@Module({
  imports:[MongooseModule.forFeature([{ name: Order.name, schema:OrderSchema}]),forwardRef(() => UserModule),AdvertismentModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports:[OrderService]
})
export class OrderModule {}
