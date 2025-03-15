import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { TOrder, TOrderBy } from 'src/types/typeAll';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Category successfully created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @Req() request: Request) {
    return this.categoryService.create(createCategoryDto, request["user"]);
  }

  @ApiOperation({ summary: 'Get all categories with filtering and pagination' })
  @ApiResponse({ status: 200, description: 'List of categories' })
  @ApiQuery({ name: 'limit', required: false, example: '10', description: 'Number of results to return' })
  @ApiQuery({ name: 'offset', required: false, example: '0', description: 'Number of results to skip' })
  @ApiQuery({ name: 'order', required: false, example: 'ASC', description: 'Sort order (ASC or DESC)' })
  @ApiQuery({ name: 'orderBy', required: false, example: 'nameUz', description: 'Field to sort by' })
  @ApiQuery({ name: 'name', required: false, example: 'Elektronika', description: 'Filter categories by name' })
  @Get()
  findAll(@Query() query: { limit?: string, offset?: string, order?: TOrder, orderBy?: TOrderBy, name?: string }) {
    return this.categoryService.findAll(query);
  }

  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiResponse({ status: 200, description: 'Category found' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a category' })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @Req() request: Request) {
    return this.categoryService.update(id, updateCategoryDto, request["user"]);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a category' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.categoryService.remove(id, request["user"]);
  }
}
