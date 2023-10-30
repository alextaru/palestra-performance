import { parentPort, workerData } from 'worker_threads';

async function chamadaRapida(quantidadeChamada: number) {
  const funcoes = [];
  for (let index = 0; index < quantidadeChamada; index++) {
    funcoes.push(api());
  }
  await Promise.all(funcoes);
}

async function api(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Hello World!');
      resolve('Hello World!');
    }, 5000);
  });
}
const { quantidadeChamada } = workerData;
chamadaRapida(quantidadeChamada);
parentPort.postMessage(quantidadeChamada);
