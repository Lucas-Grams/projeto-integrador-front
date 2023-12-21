import {EmbarcacaoDTO} from "./embarcacao.dto";

export class HabilitarTRDTO {

   id!: number;
   nome!: string;
   cpf!: string;
   email!: string;
   telefone!: string;
   cep!: string;
   logradouro!: string;
   numero!: string;
   complemento!: string;
   municipio!: string;
   uf!: string;
   formacao!: string;
   numHabilitacao!: string;
   conselhoClasse!: string;
   ufConselho!: string;
   copiaHabilitacao!: string;
   diplomaCertificacao!: string;
   copiaHabilitacaoBase64!: string;
   diplomaCertificacaoBase64!: string;
   embarcacoes: EmbarcacaoDTO[] = [];

}
