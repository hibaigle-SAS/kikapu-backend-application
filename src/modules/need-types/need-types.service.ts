import { DatabaseService } from '@/database/database.service';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { NeedTypeDto } from './dto';

@Injectable()
export class NeedTypesService {
  private readonly logger = new Logger(NeedTypesService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async fetch(
    page: number,
    limit: number,
    startDate?: string,
    endDate?: string,
  ) {
    let start: any;
    let end: any;

    if (startDate !== null && endDate !== null) {
      start = new Date(startDate);
      start.setHours(0, 0, 0, 0);

      end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
    }

    const where = {
      ...(startDate && endDate
        ? {
            createdAt: {
              gt: start,
              lt: end,
            },
          }
        : {}),
    };

    const count = await this.databaseService.needsTypes.count({ where });
    const result = await this.databaseService.needsTypes.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where,
    });

    return {
      count,
      data: result,
    };
  }

  async create(data: NeedTypeDto) {
    try {
      const result = await this.databaseService.needsTypes.create({
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

  async update(id: string, data: NeedTypeDto) {
    const { name } = data;
    try {
      const result = await this.databaseService.needsTypes.update({
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
