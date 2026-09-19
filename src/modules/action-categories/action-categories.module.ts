import { Module } from '@nestjs/common';
import { ActionCategoriesController } from './action-categories.controller';
import { ActionCategoriesService } from './action-categories.service';

@Module({
  controllers: [ActionCategoriesController],
  providers: [ActionCategoriesService]
})
export class ActionCategoriesModule {}
