import Account, { IAccount } from "../models/Account";

export async function gerarNumeroContaUnico(): Promise<string> {
  let numero: string;
  let contaExistente: IAccount | null;

  do {
    numero = Math.floor(100000 + Math.random() * 900000).toString();
    contaExistente = await Account.findOne({ numero_conta: numero });
  } while (contaExistente);

  return numero;
}

export function gerarAgencia(): string {
  return "1234";
}
