import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';
import { CreateUsersDto } from './dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersService } from './users.service';

@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiQuery({
    name: 'roleId',
    type: 'string',
    required: false,
    description: 'First-name || Middle-name || Last-name || Phone',
  })
  fetchUser(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('limit', new ParseIntPipe()) limit: number,
    @Query('roleId', new ParseUUIDPipe({ optional: true })) roleId: string,
  ) {
    return this.usersService.fetchUsers(page, limit, roleId);
  }

  @ApiOperation({
    summary:
      'Search all types of user by his first name, middle name, last name OR phone number',
  })
  @ApiQuery({
    name: 'term',
    type: 'string',
    description: 'First-name  |  Middle-name  |  Last-name  |  Phone',
  })
  @ApiQuery({ name: 'roleId', type: String, required: false })
  @Get('search')
  search(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('limit', new ParseIntPipe()) limit: number,
    @Query('term') term: string,
    @Query('roleId', new ParseUUIDPipe({ optional: true })) roleId?: string,
  ) {
    return this.usersService.search(page, limit, term, roleId);
  }

  @Get('agents')
  @ApiQuery({ name: 'roleId', type: 'string', required: false })
  fetchAgents(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('limit', new ParseIntPipe()) limit: number,
    @Query('roleId', new ParseUUIDPipe({ optional: true })) roleId: string,
  ) {
    return this.usersService.fetchAgents(page, limit, roleId);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Patch()
  updateUser(@Body(ValidationPipe) dto: UpdateUserDto) {
    return this.usersService.updateUsers(dto);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Put('deactivate-or-activate:id')
  deactivateOrActivateUser(@Param('id') id: string) {
    return this.usersService.deactivateOrActivateUser(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createUser(@Body(ValidationPipe) dto: CreateUsersDto) {
    return this.usersService.createUser(dto);
  }
}
