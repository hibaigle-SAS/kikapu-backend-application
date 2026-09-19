import { Module } from '@nestjs/common';
import { CompanyEvaluationsController } from './company-evaluations.controller';
import { CompanyEvaluationsService } from './company-evaluations.service';

@Module({
  controllers: [CompanyEvaluationsController],
  providers: [CompanyEvaluationsService]
})
export class CompanyEvaluationsModule {}
