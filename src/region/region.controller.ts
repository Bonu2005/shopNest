import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { TOrder, TOrderBy } from 'src/types/typeAll';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('Region')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new region' })
  @ApiResponse({ status: 201, description: 'Region successfully created' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createRegionDto: CreateRegionDto, @Req() request: Request) {
    return this.regionService.create(createRegionDto, request["user"]);
  }

  @ApiOperation({ summary: 'Get all regions with pagination' })
  @ApiResponse({ status: 200, description: 'List of regions' })
  @ApiQuery({ name: 'limit', example: '10', required: false })
  @ApiQuery({ name: 'offset', example: '0', required: false })
  // @ApiQuery({ name: 'order', enum: TOrder, required: false })
  // @ApiQuery({ name: 'orderBy', enum: TOrderBy, required: false })
  @Get()
  findAll(@Query() query: { limit: string; offset: string; order: TOrder; orderBy: TOrderBy }) {
    return this.regionService.findAll(query);
  }

  @ApiOperation({ summary: 'Get region by ID' })
  @ApiResponse({ status: 200, description: 'Region found' })
  @ApiResponse({ status: 404, description: 'Region not found' })
  @ApiParam({ name: 'id', example: '605c72a93f1b2a001f8a0d5a' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update region by ID' })
  @ApiResponse({ status: 200, description: 'Region successfully updated' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Region not found' })
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto, @Req() request: Request) {
    return this.regionService.update(id, updateRegionDto, request["user"]);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete region by ID' })
  @ApiResponse({ status: 200, description: 'Region successfully deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Region not found' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.regionService.remove(id, request["user"]);
  }
}
