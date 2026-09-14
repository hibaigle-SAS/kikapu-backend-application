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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessLevelService } from './access-level.service';
import { CreatePermissionsDto, PermissionDto, RoleDto } from './dto';

// @ApiBearerAuth('access-token')
// @UseGuards(JwtGuard)
@ApiTags('Access-level')
@Controller('access-level')
export class AccessLevelController {
  constructor(private readonly accessLevelService: AccessLevelService) {}

  @ApiOperation({
    summary: 'This API creates a role',
  })
  @Post('roles')
  createRole(@Body(ValidationPipe) dto: RoleDto) {
    return this.accessLevelService.createRole(dto);
  }

  @ApiOperation({
    summary: 'This API updates an existing role',
  })
  @Put('roles/:roleId')
  updateRole(
    @Param('roleId', new ParseUUIDPipe()) roleId: string,
    @Body(ValidationPipe) dto: RoleDto,
  ) {
    return this.accessLevelService.updateRole(roleId, dto);
  }

  @Get('by-name')
  fetchRoleByName(@Query('name') name: string) {
    const result = this.accessLevelService.fetchRoleByName(name);
    return result;
  }

  @ApiOperation({
    summary: 'This API fetches a paginated list of role',
  })
  @Get('roles')
  fetchRoles(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('limit', new ParseIntPipe()) limit: number,
  ) {
    return this.accessLevelService.fetchRoles(page, limit);
  }

  @ApiOperation({
    summary: 'This API creates permissions',
  })
  @Post('permissions')
  createPermissions(@Body(ValidationPipe) dto: CreatePermissionsDto) {
    return this.accessLevelService.createPermissions(dto);
  }

  @ApiOperation({
    summary: 'This API updates a permission',
  })
  @Put('permissions/:permissionId')
  updatePermissions(
    @Param('permissionId', new ParseUUIDPipe()) permissionId: string,
    @Body(ValidationPipe) dto: PermissionDto,
  ) {
    return this.accessLevelService.updatePermissions(permissionId, dto);
  }

  @ApiOperation({
    summary: 'This API fetches a paginated list of permissions',
  })
  @Get('permissions')
  fetchPermissions(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('limit', new ParseIntPipe()) limit: number,
  ) {
    return this.accessLevelService.fetchPermissions(page, limit);
  }
}
