import { Controller, Get, Post, Body, Param, Req, UseGuards, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { TOrder, TOrderBy } from 'src/types/typeAll';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order successfully created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() request: Request) {
    return this.orderService.create(createOrderDto, request["user"]);
  }

  @ApiOperation({ summary: 'Get all orders with pagination and sorting' })
  @ApiResponse({ status: 200, description: 'List of orders' })
  @ApiQuery({ name: 'limit', required: false, example: '10', description: 'Number of results to return' })
  @ApiQuery({ name: 'offset', required: false, example: '0', description: 'Number of results to skip' })
  @ApiQuery({ name: 'order', required: false, example: 'ASC', description: 'Sort order (ASC or DESC)' })
  @ApiQuery({ name: 'orderBy', required: false, example: 'createdAt', description: 'Field to sort by' })
  @Get()
  findAll(@Query() query: { limit: string; offset: string; order: TOrder; orderBy: TOrderBy }) {
    return this.orderService.findAll(query);
  }

  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiResponse({ status: 200, description: 'Order found' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }
}
