import { Module } from '@nestjs/common';
import { NeedTypesController } from './need-types.controller';
import { NeedTypesService } from './need-types.service';

@Module({
  controllers: [NeedTypesController],
  providers: [NeedTypesService]
})
export class NeedTypesModule {}
