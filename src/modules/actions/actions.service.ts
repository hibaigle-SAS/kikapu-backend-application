import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ActionDto } from './dto';
import { DatabaseService } from '@/database/database.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable()
export class ActionsService {
  private readonly logger = new Logger(ActionsService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async fetch(page: number, limit: number) {
    const count = await this.databaseService.actions.count();
    const result = await this.databaseService.actions.findMany({
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      count,
      data: result,
    };
  }

  async create(data: ActionDto) {
    try {
      const result = await this.databaseService.actions.create({
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

  async update(id: string, data: ActionDto) {
    const { name } = data;
    try {
      const result = await this.databaseService.actions.update({
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
