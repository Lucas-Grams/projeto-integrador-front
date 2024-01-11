import {Endereco} from "./endereco.model";

export class Usuario{
   id?: number;
   nome?: String;
   cpf?: String;
   email?: String;
   senha?: String;
   data_cadastro?: Date;
   endereco?: Endereco;
   ativo?: boolean;
   uuid?: String;
   permissao:String[] = [];
}
