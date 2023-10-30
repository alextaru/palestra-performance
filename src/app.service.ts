import { Injectable } from '@nestjs/common';
import { Worker } from 'worker_threads';
import { WorkerService } from './worker/worker.service';

@Injectable()
export class AppService {
  constructor(private workerService: WorkerService) {}

  async getHello(): Promise<string> {
    console.time();
    const quantidadeChamada = 20;
    await this.workerService.chamadaSuperRapida(quantidadeChamada);
    // await this.chamadaSuperRapida(quantidadeChamada);
    // await this.chamadaRapida(quantidadeChamada);
    // await this.chamadaLenta(quantidadeChamada);
    console.timeEnd();
    return 'Hello World!';
  }

  private async chamadaSuperRapida(quantidadeChamada: number) {
    const filePath = `${__dirname}/worker.js`;
    return new Promise((resolve, reject) => {
      const worker = new Worker(filePath, {
        workerData: { quantidadeChamada },
      });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', () => console.log('terminou'));
    });
  }

  private async chamadaRapida(quantidadeChamada: number) {
    const funcoes = [];
    for (let index = 0; index < quantidadeChamada; index++) {
      funcoes.push(this.api());
    }
    await Promise.all(funcoes);
  }

  private async chamadaLenta(quantidadeChamada: number) {
    for (let index = 0; index < quantidadeChamada; index++) {
      await this.api();
    }
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
