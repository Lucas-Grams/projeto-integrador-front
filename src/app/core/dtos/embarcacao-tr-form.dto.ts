import {EmbarcacaoDTO} from "./embarcacao.dto";

export class EmbarcacaoTRFormDTO {

   idEmbarcacao!: number;
   embarcacaoDTO!: EmbarcacaoDTO;
   nomeProprietario!: string;
   cpfProprietario!: string;
   emailProprietario!: string;
   declaracaoProprietario!: string;
   declaracaoProprietarioBase64!: string;
   mercadoAtuacao!: string;
   tempoMedioPesca!: number;
   tipoConservacao!: string;
   capacidadeTotal!: number;
   capacidadePescado!: number;

}
