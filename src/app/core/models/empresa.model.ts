import {Endereco} from "./endereco.model";
import {Usuario} from "./usuario.model";

export class Empresa{
    id?: number;
    razaoSocial?: String;
    nomeFantasia?: String;
    cnpj?: String;
    endereco: Endereco;
    ativo?: boolean;
    uuid?: String;
    dataCadastro?: Date;
    ultimaAtualizacao?: Date;
    usuarios?: Usuario[] = [];

    constructor() {
        this.endereco = new Endereco();
    }
}
