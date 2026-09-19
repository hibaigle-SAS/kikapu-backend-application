import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';
import { CompaniesService } from './companies.service';
import { CompanyDto } from './dto';

@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

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
