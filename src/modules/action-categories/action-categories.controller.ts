import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';
import { ActionCategoriesService } from './action-categories.service';
import { ActionCategories } from 'generated/prisma/browser';

@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('action-categories')
export class ActionCategoriesController {
  constructor(
    private readonly actionCategoriesService: ActionCategoriesService,
  ) {}

  @ApiOperation({
    summary: 'This API fetches action categories',
  })
  @Get()
  get(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('limit', new ParseIntPipe()) limit: number,
  ) {
    return this.actionCategoriesService.fetch(page, limit);
  }

  @ApiOperation({
    summary: 'This API updates action categories',
  })
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: ActionCategories,
  ) {
    return this.actionCategoriesService.update(id, dto);
  }

  @ApiOperation({
    summary: 'This API creates action typesa',
  })
  @Post()
  create(@Body(ValidationPipe) dto: ActionCategories) {
    return this.actionCategoriesService.create(dto);
  }
}
