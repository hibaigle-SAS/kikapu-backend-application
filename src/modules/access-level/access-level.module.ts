import { Module } from '@nestjs/common';
import { AccessLevelController } from './access-level.controller';
import { AccessLevelService } from './access-level.service';

@Module({
  controllers: [AccessLevelController],
  providers: [AccessLevelService],
  exports : [AccessLevelService]
})
export class AccessLevelModule {}
