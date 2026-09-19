import { DatabaseService } from '@/database/database.service';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ActionTypeDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable()
export class ActionTypesService {
  private readonly logger = new Logger(ActionTypesService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async fetch(page: number, limit: number) {
    const count = await this.databaseService.actionTypes.count();
    const result = await this.databaseService.currencies.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      count,
      data: result,
    };
  }

  async create(data: ActionTypeDto) {
    try {
      const result = await this.databaseService.actionTypes.create({
        data,
      });
      return result;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error?.code === 'P2002') {
          if (error.meta?.target[0] === 'name')
            throw new ConflictException('Nom déjà utilisé');
        } else {
          throw new InternalServerErrorException(error);
        }
      }
    }
  }

  async update(id: string, data: ActionTypeDto) {
    const { name, description } = data;
    try {
      const result = await this.databaseService.actionTypes.update({
        data: {
          ...(name !== undefined ? { name } : {}),
          ...(description !== undefined ? { description } : {}),
        },
        where: { id },
      });
      return result;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
