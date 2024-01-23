import {Endereco} from "./endereco.model";
import {Unidade} from "./unidade.model";
import {Usuario} from "./usuario.model";
import {Permissao} from "./permissao.model";

export class UnidadeUsuario{
   id?: number;
   unidade:Unidade =  new Unidade();
   usuario: Usuario = new Usuario();
   permissao: Permissao[] = [];
   ativo?:boolean;

}
