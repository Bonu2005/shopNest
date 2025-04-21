import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { TOrder, TOrderBy, UserType } from 'src/types/typeAll';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('Colors')
@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}
  @UseGuards(RoleGuard)
  @Roles(UserType.ADMIN)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new color' })
  @ApiResponse({ status: 201, description: 'Color successfully created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  create(@Body() createColorDto: CreateColorDto, @Req() request: Request) {
    return this.colorService.create(createColorDto, request["user"]);
  }

  @ApiOperation({ summary: 'Get all colors with pagination and sorting' })
  @ApiResponse({ status: 200, description: 'List of colors' })
  @ApiQuery({ name: 'limit', required: false, example: '10', description: 'Number of results to return' })
  @ApiQuery({ name: 'offset', required: false, example: '0', description: 'Number of results to skip' })
  @ApiQuery({ name: 'order', required: false, example: 'ASC', description: 'Sort order (ASC or DESC)' })
  @ApiQuery({ name: 'orderBy', required: false, example: 'nameUz', description: 'Field to sort by' })
  @Get()
  findAll(@Query() query: { limit?: string; offset?: string; order?: TOrder; orderBy?: TOrderBy }) {
    return this.colorService.findAll(query);
  }

  @ApiOperation({ summary: 'Get a color by ID' })
  @ApiResponse({ status: 200, description: 'Color found' })
  @ApiResponse({ status: 404, description: 'Color not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colorService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a color' })
  @ApiResponse({ status: 200, description: 'Color updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Color not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColorDto: UpdateColorDto, @Req() request: Request) {
    return this.colorService.update(id, updateColorDto, request["user"]);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a color' })
  @ApiResponse({ status: 200, description: 'Color deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Color not found' })
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.colorService.remove(id, request["user"]);
  }
}
