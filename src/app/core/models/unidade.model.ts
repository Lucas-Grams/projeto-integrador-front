import {Endereco} from "./endereco.model";

export class Unidade{
   id: number;
   nome: String;
   tipo: String;
   endereco: Endereco;
   idUnidadeGerenciadora: number;
   ativo: boolean;
   uuid: String;
   dataCadastro: Date;
   ultima_atualizacao: Date;

   constructor() {
      this.id = 0;
      this.nome = '';
      this.tipo = '';
      this.idUnidadeGerenciadora = 0;
      this.ativo = false;
      this.uuid = '';
      this.dataCadastro = new Date();
      this.ultima_atualizacao = new Date();
      this.endereco = new Endereco();
   }
}
