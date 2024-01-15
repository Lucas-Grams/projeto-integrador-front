import {Endereco} from "./endereco.model";
import {Unidade} from "./unidade.model";

export class Usuario{
   id?: number;
   unidades?:Unidade[]=[];
   usuarios?: Usuario[]=[];
   permissoes?: Permissao[]=[];
   ativo?:boolean;

}
export class Permissao{
   id?: number | null;
   descricao?: String;
}
