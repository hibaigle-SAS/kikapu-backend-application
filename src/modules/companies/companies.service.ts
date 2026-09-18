import { DatabaseService } from '@/database/database.service';
import { ConflictException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { CompanyDto } from './dto';

@Injectable()
export class CompaniesService {
  private readonly logger = new Logger(CompaniesService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: CompanyDto) {
    try {
      const result = await this.databaseService.companies.create({
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
}
