import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { BullModule } from '@nestjs/bull';
import { WorkerProcessor } from './worker-processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'api',
    }),
  ],
  providers: [WorkerService, WorkerProcessor],
  exports: [WorkerService],
})
export class WorkerModule {}
