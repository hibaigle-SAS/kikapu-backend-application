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
import { ActionTypesService } from './action-types.service';
import { ActionTypeDto } from './dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';

@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('action-types')
export class ActionTypesController {
  constructor(private readonly actionTypesService: ActionTypesService) {}

  @ApiOperation({
    summary: 'This API fetches action types',
  })
  @Get()
  get(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('limit', new ParseIntPipe()) limit: number,
  ) {
    return this.actionTypesService.fetch(page, limit);
  }

  @ApiOperation({
    summary: 'This API updates action types',
  })
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: ActionTypeDto,
  ) {
    return this.actionTypesService.update(id, dto);
  }

  @ApiOperation({
    summary: 'This API creates action typesa',
  })
  @Post()
  create(@Body(ValidationPipe) dto: ActionTypeDto) {
    return this.actionTypesService.create(dto);
  }
}
