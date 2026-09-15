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
import { CompanyTypesService } from './company-types.service';
import { CompanyTypeDto } from './dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';

@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('company-types')
export class CompanyTypesController {
  constructor(private readonly companyTypesService: CompanyTypesService) {}

  @ApiOperation({
    summary: 'This API fetches company types',
  })
  @Get()
  get(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('limit', new ParseIntPipe()) limit: number,
  ) {
    return this.companyTypesService.fetch(page, limit);
  }

  @ApiOperation({
    summary: 'This API updates company types',
  })
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: CompanyTypeDto,
  ) {
    return this.companyTypesService.update(id, dto);
  }

  @ApiOperation({
    summary: 'This API creates company types',
  })
  @Post()
  create(@Body(ValidationPipe) dto: CompanyTypeDto) {
    return this.companyTypesService.create(dto);
  }
}
