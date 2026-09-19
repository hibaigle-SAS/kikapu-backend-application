import { DatabaseService } from '@/database/database.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { CompanyDto } from './dto';

@Injectable()
export class CompaniesService {
  private readonly logger = new Logger(CompaniesService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: CompanyDto) {
    try {
      const { companyAssetTypes, creationDate, ...companyData } = data;

      const result = await this.databaseService.companies.create({
        data: {
          ...companyData,

          // Convert API date into a real Date
          ...(creationDate && {
            creationDate: new Date(creationDate),
          }),

          companyHasAssetsTypes: companyAssetTypes?.length
            ? {
                create: companyAssetTypes.map((assetType) => ({
                  assetType: {
                    connect: {
                      id: assetType.assetTypeId,
                    },
                  },

                  details: assetType.companyAssetTypeDetails?.length
                    ? {
                        create: assetType.companyAssetTypeDetails.map(
                          (detail) => ({
                            name: detail.name,
                            quantity: detail.quantity,
                            amount: detail.amount,

                            ...(detail.acquisitionDate && {
                              acquisitionDate: new Date(detail.acquisitionDate),
                            }),

                            ...(detail.currencyId && {
                              currency: {
                                connect: {
                                  id: detail.currencyId,
                                },
                              },
                            }),
                          }),
                        ),
                      }
                    : undefined,
                })),
              }
            : undefined,
        },

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
      });

      return result;
    } catch (error) {
      this.logger.error(
        `Failed to create company: ${
          error instanceof Error ? error.message : String(error)
        }`,
        error instanceof Error ? error.stack : undefined,
      );

      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          /**
           * Unique constraint violation
           */
          case 'P2002': {
            const target = Array.isArray(error.meta?.target)
              ? error.meta.target.join(', ')
              : String(error.meta?.target ?? '');

            if (target.includes('rccm')) {
              throw new ConflictException('Le RCCM existe déjà');
            }

            if (target.includes('id_nat')) {
              throw new ConflictException('L’identifiant national existe déjà');
            }

            if (target.includes('numero_impot')) {
              throw new ConflictException('Le numéro d’impôt existe déjà');
            }

            throw new ConflictException(
              'Une entreprise avec ces informations existe déjà',
            );
          }

          /**
           * Foreign key constraint violation
           */
          case 'P2003': {
            throw new BadRequestException(
              'Une référence fournie pour l’entreprise est invalide',
            );
          }

          /**
           * Required record not found
           */
          case 'P2025': {
            throw new NotFoundException(
              'Une des ressources associées à l’entreprise est introuvable',
            );
          }

          default: {
            throw new InternalServerErrorException(
              'Impossible de créer l’entreprise',
            );
          }
        }
      }

      /**
       * Never expose unknown database/internal errors
       * to the client.
       */
      throw new InternalServerErrorException(
        'Une erreur interne est survenue lors de la création de l’entreprise',
      );
    }
  }
}
