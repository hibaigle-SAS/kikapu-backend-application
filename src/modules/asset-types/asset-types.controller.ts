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
import { AssetTypesService } from './asset-types.service';
import { AssetTypeDto } from './dto';
import { JwtGuard } from '../auth/guard';

@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('asset-types')
export class AssetTypesController {
  constructor(private readonly assetTypesService: AssetTypesService) {}

  @ApiOperation({
    summary: 'This API fetches asset types',
  })
  @Get()
  get(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('limit', new ParseIntPipe()) limit: number,
  ) {
    return this.assetTypesService.fetch(page, limit);
  }

  @ApiOperation({
    summary: 'This API updates asset types',
  })
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: AssetTypeDto,
  ) {
    return this.assetTypesService.update(id, dto);
  }

  @ApiOperation({
    summary: 'This API creates asset types',
  })
  @Post()
  create(@Body(ValidationPipe) dto: AssetTypeDto) {
    return this.assetTypesService.create(dto);
  }
}
