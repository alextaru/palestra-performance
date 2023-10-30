import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

type chamadaRapidaType = {
  quantidadeChamada: number;
};

@Processor('api')
export class WorkerProcessor {
  @Process('chamadaRapida')
  async chamadaRapida(job: Job<chamadaRapidaType>) {
    const { quantidadeChamada } = job.data;
    const funcoes = [];
    for (let index = 0; index < quantidadeChamada; index++) {
      funcoes.push(this.api());
    }
    await Promise.all(funcoes);
  }

  private async api(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Hello World!');
        resolve('Hello World!');
      }, 5000);
    });
  }
}
