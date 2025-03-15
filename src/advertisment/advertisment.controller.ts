import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { AdvertismentService } from './advertisment.service';
import { CreateAdvertismentDto } from './dto/create-advertisment.dto';
import { UpdateAdvertismentDto } from './dto/update-advertisment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { TOrder, TOrderBy } from 'src/types/typeAll';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('Advertisements')
@Controller('advertisment')
export class AdvertismentController {
  constructor(private readonly advertismentService: AdvertismentService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new advertisement' })
  @ApiResponse({ status: 201, description: 'Advertisement successfully created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  create(@Body() createAdvertismentDto: CreateAdvertismentDto, @Req() request: Request) {
    return this.advertismentService.create(createAdvertismentDto, request["user"]);
  }

  @ApiOperation({ summary: 'Get all advertisements with pagination and sorting' })
  @ApiResponse({ status: 200, description: 'List of advertisements' })
  @ApiQuery({ name: 'limit', example: '10', required: false })
  @ApiQuery({ name: 'offset', example: '0', required: false })
  // @ApiQuery({ name: 'order', enum: TOrder, required: false })
  // @ApiQuery({ name: 'orderBy', enum: TOrderBy, required: false })
  @Get()
  findAll(@Query() query: { limit: string, offset: string, order: TOrder, orderBy: TOrderBy }) {
    return this.advertismentService.findAll(query);
  }

  @ApiOperation({ summary: 'Get an advertisement by ID' })
  @ApiResponse({ status: 200, description: 'Advertisement found' })
  @ApiResponse({ status: 404, description: 'Advertisement not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advertismentService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an advertisement' })
  @ApiResponse({ status: 200, description: 'Advertisement updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Advertisement not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdvertismentDto: UpdateAdvertismentDto, @Req() request: Request) {
    return this.advertismentService.update(id, updateAdvertismentDto, request["user"]);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an advertisement' })
  @ApiResponse({ status: 200, description: 'Advertisement deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Advertisement not found' })
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.advertismentService.remove(id, request["user"]);
  }
}
