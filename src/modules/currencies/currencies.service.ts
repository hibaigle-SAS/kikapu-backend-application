import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { DatabaseService } from '../../database/database.service';
import { CurrencyDto } from './dto';

@Injectable()
export class CurrenciesService {
  private readonly logger = new Logger(CurrenciesService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async fetch(page: number, limit: number) {
    const count = await this.databaseService.currencies.count();
    const result = await this.databaseService.currencies.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy : {
        createdAt : "desc"
      }
    });

    return {
      count,
      data: result,
    };
  }

  async create(data: CurrencyDto) {
    try {
      const result = await this.databaseService.currencies.create({
        data,
      });
      return result;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error?.code === 'P2002') {
          if (error.meta?.target[0] === 'name')
            throw new ConflictException('name is already used');
          if (error.meta?.target[0] === 'accronym')
            throw new ConflictException('accronym is already used');
        } else {
          throw new InternalServerErrorException(error);
        }
      }
    }
  }

  async update(id: string, data: CurrencyDto) {
    const { active, accronym, name } = data;
    try {
      const result = await this.databaseService.currencies.update({
        data: {  accronym, name },
        where: { id },
      });
      return result;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
