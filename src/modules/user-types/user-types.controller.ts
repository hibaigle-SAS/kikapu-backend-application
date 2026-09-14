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
import { UserTypesService } from './user-types.service';
import { UserTypeDto } from './dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('user-types')
export class UserTypesController {
  constructor(private readonly userTypesService: UserTypesService) {}

  @ApiOperation({
    summary: 'This API fetches user types',
  })
  @Get()
  get(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('limit', new ParseIntPipe()) limit: number,
  ) {
    return this.userTypesService.fetch(page, limit);
  }

  @ApiOperation({
    summary: 'This API updates user types',
  })
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: UserTypeDto,
  ) {
    return this.userTypesService.update(id, dto);
  }

  @ApiOperation({
    summary: 'This API creates user types',
  })
  @Post()
  create(@Body(ValidationPipe) dto: UserTypeDto) {
    return this.userTypesService.create(dto);
  }
}
