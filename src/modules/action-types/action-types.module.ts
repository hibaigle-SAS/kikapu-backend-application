import { Module } from '@nestjs/common';
import { ActionTypesController } from './action-types.controller';
import { ActionTypesService } from './action-types.service';

@Module({
  controllers: [ActionTypesController],
  providers: [ActionTypesService]
})
export class ActionTypesModule {}
