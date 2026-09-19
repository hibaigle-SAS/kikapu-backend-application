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
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';
import { CompaniesService } from './companies.service';
import { CompanyDto } from './dto';

@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @ApiOperation({
    summary: 'This API fetches the list of all companies',
  })
  @Get()
  @ApiQuery({
    name: 'createdById',
    type: 'string',
    required: false,
  })
  @ApiQuery({
    name: 'ownerId',
    type: 'string',
    required: false,
  })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  fetch(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('limit', new ParseIntPipe()) limit: number,

    @Query('createdById', new ParseUUIDPipe({ optional: true }))
    createdById?: string,

    @Query('ownerId', new ParseUUIDPipe({ optional: true })) ownerId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.companiesService.fetch(
      page,
      limit,
      createdById,
      ownerId,
      startDate,
      endDate,
    );
  }

  @ApiOperation({
    summary: "This API fetches a single company by it'id ",
  })
  @Get(':id')
  fetchById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.companiesService.fetchById(id);
  }

  @ApiOperation({
    summary: 'This API creates companies',
  })
  @Post()
  create(@Body(ValidationPipe) dto: CompanyDto) {
    return this.companiesService.create(dto);
  }

  @ApiOperation({
    summary: 'This API updates companies',
  })
  @Put(':companyId')
  update(
    @Param('companyId', new ParseUUIDPipe()) companyId: string,
    @Body(ValidationPipe) dto: CompanyDto,
  ) {
    return this.companiesService.update(companyId, dto);
  }
}
