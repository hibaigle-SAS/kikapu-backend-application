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
import { ActionsService } from './actions.service';
import { ActionDto } from './dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';

@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('actions')
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) {}

  @ApiOperation({
    summary: 'This API fetches company actions',
  })
  @Get()
  get(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('limit', new ParseIntPipe()) limit: number,
  ) {
    return this.actionsService.fetch(page, limit);
  }

  @ApiOperation({
    summary: 'This API updates company actions',
  })
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: ActionDto,
  ) {
    return this.actionsService.update(id, dto);
  }

  @ApiOperation({
    summary: 'This API creates company actions',
  })
  @Post()
  create(@Body(ValidationPipe) dto: ActionDto) {
    return this.actionsService.create(dto);
  }
}
