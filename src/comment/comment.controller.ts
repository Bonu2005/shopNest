import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { TOrder, TOrderBy } from 'src/types/typeAll';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiResponse({ status: 201, description: 'Comment successfully created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Req() request: Request) {
    return this.commentService.create(createCommentDto, request["user"]);
  }

  @ApiOperation({ summary: 'Get all comments with filtering and pagination' })
  @ApiResponse({ status: 200, description: 'List of comments' })
  @ApiQuery({ name: 'limit', required: false, example: '10', description: 'Number of results to return' })
  @ApiQuery({ name: 'offset', required: false, example: '0', description: 'Number of results to skip' })
  @ApiQuery({ name: 'order', required: false, example: 'ASC', description: 'Sort order (ASC or DESC)' })
  @ApiQuery({ name: 'orderBy', required: false, example: 'star', description: 'Field to sort by' })
  @ApiQuery({ name: 'minStar', required: false, example: '3', description: 'Minimum star rating filter' })
  @ApiQuery({ name: 'maxStar', required: false, example: '5', description: 'Maximum star rating filter' })
  @Get()
  findAll(
    @Query() query: { limit?: string; offset?: string; order?: TOrder; orderBy?: TOrderBy; minStar?: string; maxStar?: string }
  ) {
    return this.commentService.findAll(query);
  }

  @ApiOperation({ summary: 'Get a comment by ID' })
  @ApiResponse({ status: 200, description: 'Comment found' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a comment' })
  @ApiResponse({ status: 200, description: 'Comment updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto, @Req() request: Request) {
    return this.commentService.update(id, updateCommentDto, request["user"]);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiResponse({ status: 200, description: 'Comment deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.commentService.remove(id, request["user"]);
  }
}

