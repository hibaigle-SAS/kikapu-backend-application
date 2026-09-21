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
import { NeedTypesService } from './need-types.service';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';
import { NeedTypeDto } from './dto';

@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('need-types')
export class NeedTypesController {
  constructor(private readonly needTypesService: NeedTypesService) {}

  @ApiOperation({
    summary: 'This API fetches need types',
  })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @Get()
  get(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('limit', new ParseIntPipe()) limit: number,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.needTypesService.fetch(page, limit, startDate, endDate);
  }

  @ApiOperation({
    summary: 'This API updates need types',
  })
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: NeedTypeDto,
  ) {
    return this.needTypesService.update(id, dto);
  }

  @ApiOperation({
    summary: 'This API creates need types',
  })
  @Post()
  create(@Body(ValidationPipe) dto: NeedTypeDto) {
    return this.needTypesService.create(dto);
  }
}
