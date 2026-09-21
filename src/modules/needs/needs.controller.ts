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
import { NeedsService } from './needs.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ActionTypeDto } from '../action-types/dto';
import { JwtGuard } from '../auth/guard';
import { NeedDto } from './dto';

@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('needs')
export class NeedsController {
  constructor(private readonly needsService: NeedsService) {}

  @ApiOperation({
    summary: 'This API fetches needs',
  })
  @Get()
  get(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('limit', new ParseIntPipe()) limit: number,
  ) {
    return this.needsService.fetch(page, limit);
  }

  @ApiOperation({
    summary: 'This API updates needs',
  })
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: NeedDto,
  ) {
    return this.needsService.update(id, dto);
  }

  @ApiOperation({
    summary: 'This API creates needs',
  })
  @Post()
  create(@Body(ValidationPipe) dto: NeedDto) {
    return this.needsService.create(dto);
  }
}
