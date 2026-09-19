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
  ValidationPipe,
} from '@nestjs/common';
import { CompanyEvaluationsService } from './company-evaluations.service';
import { CompanyEvaluationDto } from './dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('company-evaluations')
export class CompanyEvaluationsController {
  constructor(
    private readonly companyEvaluationsService: CompanyEvaluationsService,
  ) {}

  @ApiOperation({
    summary: 'This API fetches company evaluations',
  })
  @Get()
  get(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('limit', new ParseIntPipe()) limit: number,
  ) {
    return this.companyEvaluationsService.fetch(page, limit);
  }

  @ApiOperation({
    summary: "This API fetches a single company evaluation by it'id ",
  })
  @Get(':id')
  fetchById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.companyEvaluationsService.fetchById(id);
  }

  @ApiOperation({
    summary: 'This API updates company evaluations',
  })
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: CompanyEvaluationDto,
  ) {
    return this.companyEvaluationsService.update(id, dto);
  }

  @ApiOperation({
    summary: 'This API creates company evaluations',
  })
  @Post()
  create(@Body(ValidationPipe) dto: CompanyEvaluationDto) {
    return this.companyEvaluationsService.create(dto);
  }
}
