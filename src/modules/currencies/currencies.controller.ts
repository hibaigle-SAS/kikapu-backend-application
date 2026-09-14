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
import { CurrenciesService } from './currencies.service';
import { CurrencyDto } from './dto';

@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @ApiOperation({
    summary: 'This API fetches currencies',
  })
  @Get()
  get(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('limit', new ParseIntPipe()) limit: number,
  ) {
    return this.currenciesService.fetch(page, limit);
  }

  @ApiOperation({
    summary: 'This API updates currencies',
  })
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: CurrencyDto,
  ) {
    return this.currenciesService.update(id, dto);
  }

  @ApiOperation({
    summary: 'This API creates currencies',
  })
  @Post()
  create(@Body(ValidationPipe) dto: CurrencyDto) {
    return this.currenciesService.create(dto);
  }

}
