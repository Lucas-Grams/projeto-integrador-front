import {EmbarcacaoDTO} from "./embarcacao.dto";

export interface EmbarcacaoTRDTO {

   id: number;
   uuid: string;
   embarcacaoDTO: EmbarcacaoDTO;
   idUsuario: number;
   nomeProprietario: string;
   cpfProprietario: string;
   emailProprietario: string;
   declaracaoProprietario: string;
   mercadoAtuacao: string;
   tempoMedioPesca: number;
   tipoConservacao: string;
   capacidadeTotal: number;
   capacidadePescado: number;
   ativo: boolean;
   dataCriacao: string;

}
