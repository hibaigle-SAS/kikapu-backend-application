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
import { ProfessionsService } from './professions.service';
import { ProfessionDto } from './dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';

@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('professions')
export class ProfessionsController {
  constructor(private readonly professionsService: ProfessionsService) {}

  @ApiOperation({
    summary: 'This API fetches professions',
  })
  @Get()
  get(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('limit', new ParseIntPipe()) limit: number,
  ) {
    return this.professionsService.fetch(page, limit);
  }

  @ApiOperation({
    summary: 'This API updates professions',
  })
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: ProfessionDto,
  ) {
    return this.professionsService.update(id, dto);
  }

  @ApiOperation({
    summary: 'This API creates professions',
  })
  @Post()
  create(@Body(ValidationPipe) dto: ProfessionDto) {
    return this.professionsService.create(dto);
  }
}
