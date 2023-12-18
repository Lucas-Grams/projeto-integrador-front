import {Endereco} from "./endereco.model";

export class Unidade{
   id: number;
   nome: String;
   tipo: String;
   endereco: Endereco;
   unidadeGerenciadora?: Unidade;
   idUnidadeGerenciadora?: number = 0;
   ativo: boolean;
   uuid: String;
   dataCadastro?: Date;
   ultima_atualizacao?: Date;


   constructor() {
      this.id = 0;
      this.nome = '';
      this.tipo = '';
      this.idUnidadeGerenciadora;
      this.ativo = false;
      this.uuid = '';
      this.endereco = new Endereco();
   }
}
