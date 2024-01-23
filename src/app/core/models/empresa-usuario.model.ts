
import {Usuario} from "./usuario.model";
import {Empresa} from "./empresa.model";
import {Permissao} from "./permissao.model";

export class EmpresaUsuario{
    id?: number;
    empresa: Empresa = new Empresa();
    usuario: Usuario = new Usuario();
    permissao: Permissao[] = [];
    ativo?:boolean;

}
