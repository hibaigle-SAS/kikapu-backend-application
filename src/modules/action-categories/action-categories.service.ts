import { DatabaseService } from '@/database/database.service';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ActionCategoryDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable()
export class ActionCategoriesService {
  private readonly logger = new Logger(ActionCategoriesService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async fetch(page: number, limit: number) {
    const count = await this.databaseService.actionCategories.count();
    const result = await this.databaseService.actionCategories.findMany({
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

  async create(data: ActionCategoryDto) {
    try {
      const result = await this.databaseService.actionCategories.create({
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

  async update(id: string, data: ActionCategoryDto) {
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
