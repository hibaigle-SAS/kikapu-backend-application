import { DatabaseService } from '@/database/database.service';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UserTypeDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable()
export class UserTypesService {
  private readonly logger = new Logger(UserTypesService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async fetch(page: number, limit: number) {
    const count = await this.databaseService.userTypes.count();
    const result = await this.databaseService.userTypes.findMany({
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      count,
      data: result,
    };
  }

  async create(data: UserTypeDto) {
    try {
      const result = await this.databaseService.userTypes.create({
        data,
      });
      return result;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error?.code === 'P2002') {
          if (error.meta?.target[0] === 'name')
            throw new ConflictException('Nom déjà existant');
        } else {
          throw new InternalServerErrorException(error);
        }
      }
    }
  }

  async update(id: string, data: UserTypeDto) {
    const { name } = data;
    try {
      const result = await this.databaseService.userTypes.update({
        data: { name },
        where: { id },
      });
      return result;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
