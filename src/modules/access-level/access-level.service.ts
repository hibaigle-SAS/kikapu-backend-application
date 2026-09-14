import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import {
  DatabaseService,
  PrismaTransactionClient,
} from '../../database/database.service';
import {
  CreatePermissionsDto,
  PermissionDto,
  PermissionsListDto,
  RoleDto,
  RolePermissionDto,
} from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable()
export class AccessLevelService {
  constructor(private readonly database: DatabaseService) {}
  private readonly logger = new Logger(AccessLevelService.name);

  async fetchRoles(page: number, limit: number) {
    try {
      const count = await this.database.roles.count();
      const result = await this.database.roles.findMany({
        take: limit,
        skip: (page - 1) * limit,
        include: {
          rolePermissions: {
            include: {
              permission: true,
            },
          },
        },
      });

      return {
        count,
        data: result,
      };
    } catch (error) {
      this.logger.error(error);
    }
  }

  async createRole(dto: RoleDto) {
    try {
      const { name, code, createdById } = dto;

      const result = await this.database.$transaction(async (tx) => {
        const createdRole = await tx.roles.create({
          data: { name, createdById, code },
        });

        const result = await this.affectPermissionsToRole(
          dto.permissions,
          createdRole.id,
          dto.createdById,
          tx,
        );

        return {
          role: createdRole,
          data: result,
        };
      });

      return result;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error?.code === 'P2002')
          throw new ConflictException(
            `Role name "${dto.name}" already exists.`,
          );
        else if (error instanceof BadRequestException) {
          throw new BadRequestException('Duplicate permissions in the list');
        }
      } else {
        this.logger.error(error);
        throw error;
      }
    }
  }

  async updateRole(roleId: string, dto: RoleDto) {
    try {
      const { name } = dto;

      const result = await this.database.$transaction(async (tx) => {
        // Update the role first
        const updatedRole = await this.database.roles.update({
          data: { name },
          where: { id: roleId },
        });

        // Delete every role permission relations
        await this.database.rolePermissions.deleteMany({
          where: { roleId },
        });

        const result = await this.affectPermissionsToRole(
          dto.permissions,
          roleId,
          dto.createdById,
          tx,
        );

        return {
          role: updatedRole,
          data: result,
        };
      });

      return result;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error?.code === 'P2002')
          throw new ConflictException('Role name must be unique.');
        else if (error instanceof BadRequestException)
          throw new ConflictException('Duplicate permissions in the list');
      }
    }
  }

  async createPermissions(dto: CreatePermissionsDto) {
    try {
      // Hanlde ocurence
      let obj = {};
      for (let e of dto.permissions)
        !obj[e.name] ? (obj[e.name] = 1) : obj[e.name]++;

      const valuesGreaterThanOne = Object.values(obj).filter(
        (v) => (v as number) > 1,
      );

      if (valuesGreaterThanOne.length) throw new BadRequestException();

      let createdPermissions = [];
      for (let permission of dto.permissions) {
        const result = await this.database.permissions.create({
          data: permission,
        });

        createdPermissions.push(result);
      }

      return {
        data: createdPermissions,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error?.code === 'P2002') {
          throw new ConflictException('Permission name must be unique.');
        }
      }
    }
  }

  async updatePermissions(permissionId: string, dto: PermissionDto) {
    try {
      const result = await this.database.permissions.update({
        where: {
          id: permissionId,
        },
        data: dto,
      });
      return {
        data: result,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('La permission doit etre unique.');
        }
      } else if (error instanceof BadRequestException) {
        throw new ConflictException('Permission existante');
      }

      this.logger.error(error);
    }
  }

  async fetchPermissions(page: number, limit: number) {
    const count = await this.database.permissions.count();

    try {
      const result = await this.database.permissions.findMany({
        take: limit,
        skip: (page - 1) * limit,
      });

      return {
        count,
        data: result,
      };
    } catch (error) {
      this.logger.error(error);
    }
  }

  // Affect permission to role
  async affectPermissionsToRole(
    permissions: RolePermissionDto[],
    roleId: string,
    createdById: string,
    prismaTx: PrismaTransactionClient,
  ) {
    // Exit if we duplicate permissions in the permissions list
    let obj = {};
    for (let e of permissions) !obj[e.id] ? (obj[e.id] = 1) : obj[e.id]++;

    const ocurencesGreaterThanOne = Object.values(obj).filter(
      (v) => (v as number) > 1,
    );

    // Remove the role created precedentaly
    if (ocurencesGreaterThanOne.length > 0) {
      await prismaTx.roles.delete({
        where: { id: roleId },
      });
      throw new BadRequestException();
    }

    let createdAffectations = [];
    for (let permission of permissions) {
      const result = await prismaTx.rolePermissions.create({
        data: {
          roleId,
          permissionId: permission.id,
          createdById,
        },
      });

      createdAffectations.push(result);
    }

    return createdAffectations;
  }

  // Affect permission to role
  async affectPermissionsToUser(
    permissions: PermissionsListDto[],
    userId: string,
    createdById: string,
    prismaTx?: PrismaTransactionClient,
  ) {
    try {
      // Exit if we duplicate permissions in the permissions list
      let obj = {};
      for (let e of permissions)
        !obj[e.permissionId]
          ? (obj[e.permissionId] = 1)
          : obj[e.permissionId]++;

      const ocurencesGreaterThanOne = Object.values(obj).filter(
        (v) => (v as number) > 1,
      );

      if (ocurencesGreaterThanOne.length > 0) {
        throw new BadRequestException();
      }

      const createdAffectations = await Promise.all(
        permissions.map((permission) => {
          return prismaTx
            ? prismaTx.userPermissions.create({
                data: {
                  userId,
                  permissionId: permission.permissionId,
                  createdById,
                },
              })
            : this.database.userPermissions.create({
                data: {
                  userId,
                  createdById,
                  permissionId: permission.permissionId,
                },
              });
        }),
      );

      return createdAffectations;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async defaultRole() {
    try {
      const result = await this.database.roles.findFirst({
        where: {
          code: 'customer',
        },
        include: {
          rolePermissions: {
            include: {
              permission: true,
            },
          },
        },
      });

      return result;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async fetchRoleByCode(code: string = 'customer') {
    const result = await this.database.roles.upsert({
      where: {
        code,
      },
      update: {
        code: code,
        name: code,
      },
      create: {
        code: code,
        name: code,
      },
    });

    return result;
  }

  async fetchRoleByName(name: string) {
    const result = await this.database.roles.findFirst({
      where: { name },
    });
    return result;
  }
}
