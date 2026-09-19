import { DatabaseService } from '@/database/database.service';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CompanyEvaluationDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable()
export class CompanyEvaluationsService {
  private readonly logger = new Logger(CompanyEvaluationsService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async fetch(page: number, limit: number) {
    const count = await this.databaseService.companyEvaluations.count();
    const result = await this.databaseService.companyEvaluations.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        company: true,
        currency: true,
        validatedBy: {
          omit: {
            password: true,
          },
        },
      },
    });

    return {
      count,
      data: result,
    };
  }

  async fetchById(id: string) {
    const result = await this.databaseService.companyEvaluations.findUnique({
      where: { id },
      include: {
        company: {
          include: {
            companyHasAssetsTypes: {
              include: {
                assetType: true,
                details: {
                  include: {
                    currency: true,
                  },
                },
              },
            },
            companyType: true,
            owner: true,
            createdBy: true,
          },
        },
        currency: true,
        validatedBy: {
          omit: {
            password: true,
          },
        },
      },
    });

    return result;
  }

  async create(data: CompanyEvaluationDto) {
    try {
      const result = await this.databaseService.companyEvaluations.create({
        data,
      });
      return result;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, dto: CompanyEvaluationDto) {
    const { validated, companyNetWorth, currencyId, reason } = dto;
    try {
      const result = await this.databaseService.companyEvaluations.update({
        data: {
          ...(validated !== undefined ? { validated } : {}),
          ...(companyNetWorth !== undefined ? { companyNetWorth } : {}),
          ...(currencyId !== undefined ? { currencyId } : {}),
          ...(reason !== undefined ? { reason } : {}),
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
