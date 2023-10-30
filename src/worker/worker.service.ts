import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class WorkerService {
  constructor(
    @InjectQueue('api')
    private queue: Queue,
  ) {}

  async chamadaSuperRapida(quantidadeChamada: number) {
    await this.queue.add('chamadaRapida', { quantidadeChamada });
  }
}
