import {Endereco} from "./endereco.model";
import {Usuario} from "./usuario.model";

export class Unidade{
   id?: number;
   nome: String;
   tipo: String;
   endereco: Endereco;
   unidadeGerenciadora?: Unidade;
   idUnidadeGerenciadora?: number = 0;
   ativo: boolean;
   uuid: String;
   dataCadastro?: Date;
   ultimaAtualizacao?: Date;
   usuarios: Usuario[] = [];



   constructor() {
      this.nome = '';
      this.tipo = '';
      this.idUnidadeGerenciadora;
      this.ativo = false;
      this.uuid = '';
      this.endereco = new Endereco();
   }
}
