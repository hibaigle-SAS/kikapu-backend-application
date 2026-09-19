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
import buildFilters from '@/tools/build-filters';

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

  async update(companyId: string, data: CompanyDto) {
    try {
      const { companyAssetTypes, creationDate, ...companyData } = data;

      const result = await this.databaseService.$transaction(async (tx) => {
        // 1. Make sure the company exists
        const existingCompany = await tx.companies.findUnique({
          where: {
            id: companyId,
          },
        });

        if (!existingCompany) {
          throw new NotFoundException('Entreprise introuvable');
        }

        // 2. Update the company itself
        await tx.companies.update({
          where: {
            id: companyId,
          },

          data: {
            ...companyData,

            ...(creationDate && {
              creationDate: new Date(creationDate),
            }),
          },
        });

        // 3. Update asset types/details if they were provided
        if (companyAssetTypes !== undefined) {
          // Remove existing asset type relationships.
          // Because details have onDelete: Cascade,
          // their details will also be removed.
          await tx.companyHasAssetsTypes.deleteMany({
            where: {
              companyId,
            },
          });

          // Recreate the asset types and their details
          if (companyAssetTypes.length > 0) {
            await tx.companyHasAssetsTypes.createMany({
              data: companyAssetTypes.map((assetType) => ({
                companyId,
                assetTypeId: assetType.assetTypeId,
              })),
            });

            // Create details separately because createMany
            // cannot create nested relations.
            for (const assetType of companyAssetTypes) {
              if (!assetType.companyAssetTypeDetails?.length) {
                continue;
              }

              const companyAssetType = await tx.companyHasAssetsTypes.findFirst(
                {
                  where: {
                    companyId,
                    assetTypeId: assetType.assetTypeId,
                  },
                },
              );

              if (!companyAssetType) {
                throw new InternalServerErrorException(
                  'Impossible de créer le type d’actif',
                );
              }

              await tx.companyHasAssetsTypeDetails.createMany({
                data: assetType.companyAssetTypeDetails.map((detail) => ({
                  companyAssetTypeId: companyAssetType.id,

                  name: detail.name,
                  quantity: detail.quantity,
                  amount: detail.amount,

                  ...(detail.acquisitionDate && {
                    acquisitionDate: new Date(detail.acquisitionDate),
                  }),

                  currencyId: detail.currencyId,
                })),
              });
            }
          }
        }

        // 4. Return the complete updated company
        return tx.companies.findUnique({
          where: {
            id: companyId,
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
      });

      return result;
    } catch (error) {
      this.logger.error(
        `Failed to update company ${companyId}: ${
          error instanceof Error ? error.message : String(error)
        }`,
        error instanceof Error ? error.stack : undefined,
      );

      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
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

          case 'P2003':
            throw new BadRequestException(
              'Une référence fournie pour l’entreprise est invalide',
            );

          case 'P2025':
            throw new NotFoundException(
              'Entreprise ou ressource associée introuvable',
            );

          default:
            throw new InternalServerErrorException(
              'Impossible de mettre à jour l’entreprise',
            );
        }
      }

      if (error instanceof NotFoundException) {
        throw error;
      }

      if (error instanceof BadRequestException) {
        throw error;
      }

      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Une erreur interne est survenue lors de la mise à jour de l’entreprise',
      );
    }
  }

  async fetch(
    page: number,
    limit: number,
    createdById?: string,
    ownerId?: string,
    startDate?: string,
    endDate?: string,
  ) {
    try {
      let start: any;
      let end: any;

      if (startDate !== null && endDate !== null) {
        start = new Date(startDate);
        start.setHours(0, 0, 0, 0);

        end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
      }

      const whereCondition = buildFilters({
        createdById,
        ownerId,
      });

      const where = {
        ...whereCondition,
        ...(startDate && endDate
          ? {
              createdAt: {
                gt: start,
                lt: end,
              },
            }
          : {}),
      };

      const count = await this.databaseService.companies.count({
        where,
      });

      const result = await this.databaseService.companies.findMany({
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: 'desc' },
        where,
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

      return {
        count,
        data: result,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async fetchById(id: string) {
    try {
      const result = await this.databaseService.companies.findUnique({
        where: { id },
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
      this.logger.error(error);
      throw error;
    }
  }
}
