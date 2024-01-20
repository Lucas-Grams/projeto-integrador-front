import {Endereco} from "./endereco.model";
import {Unidade} from "./unidade.model";
import {Usuario} from "./usuario.model";

export class UnidadeUsuario{
   id?: number;
   unidade:Unidade =  new Unidade();
   usuario: Usuario = new Usuario();
   permissao: Permissao[] = [];
   ativo?:boolean;

}
export class Permissao{
   id?: number | null;
   descricao?: String;
}
