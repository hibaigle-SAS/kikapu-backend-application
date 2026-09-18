import {
    Body,
    Controller,
    Post,
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
}
