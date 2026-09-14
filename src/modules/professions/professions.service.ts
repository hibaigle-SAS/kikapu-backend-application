import { DatabaseService } from '@/database/database.service';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { ProfessionDto } from './dto';

@Injectable()
export class ProfessionsService {
  private readonly logger = new Logger(ProfessionsService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async fetch(page: number, limit: number) {
    const count = await this.databaseService.professions.count();
    const result = await this.databaseService.professions.findMany({
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      count,
      data: result,
    };
  }

  async create(data: ProfessionDto) {
    try {
      const result = await this.databaseService.professions.create({
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

  async update(id: string, data: ProfessionDto) {
    const { name } = data;
    try {
      const result = await this.databaseService.professions.update({
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
