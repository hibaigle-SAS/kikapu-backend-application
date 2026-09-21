import { DatabaseService } from '@/database/database.service';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { NeedDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable()
export class NeedsService {
  private readonly logger = new Logger(NeedsService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async fetch(page: number, limit: number) {
    const count = await this.databaseService.needs.count();
    const result = await this.databaseService.needs.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        needType: true,
      },
    });

    return {
      count,
      data: result,
    };
  }

  async create(data: NeedDto) {
    try {
      const result = await this.databaseService.needs.create({
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

  async update(id: string, data: NeedDto) {
    const { name, description, needTypeId } = data;
    try {
      const result = await this.databaseService.needs.update({
        data: {
          ...(name !== undefined ? { name } : {}),
          ...(description !== undefined ? { description } : {}),
          ...(needTypeId !== undefined ? { needTypeId } : {}),
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
