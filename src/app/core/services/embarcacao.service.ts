import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {EmbarcacaoDTO} from "../dtos/embarcacao.dto";
import {ResponseDTO} from "../dtos/response.dto";
import {EnvService} from "./env/env.service";
import {EmbarcacaoTRFormDTO} from "../dtos/embarcacao-tr-form.dto";
import {EmbarcacaoTRDTO} from "../dtos/embarcacao-tr.dto";

@Injectable({
   providedIn: 'root'
})
export class EmbarcacaoService {

   private URL: string = ``;

   constructor(private http: HttpClient, private env: EnvService) {
         this.URL = `${this.env.url.api}/embarcacao`;
   }

   public findAllEmbarcacaoByRgpTieNome(filtro: string) {
      return this.http.get<ResponseDTO<EmbarcacaoDTO[]>>(`${this.URL}/buscar/${filtro}`);
   }

   public cadastrarEmbarcacaoTR(dtos: EmbarcacaoTRFormDTO[]) {
      return this.http.post<ResponseDTO<string>>(`${this.URL}/tr`, dtos);
   }

   public minhasEmbarcacoes() {
      return this.http.get<EmbarcacaoTRDTO[]>(`${this.URL}/tr/minhas-embarcacoes`);
   }

   public detalhesEmbarcacao(uuid: string) {
      return this.http.get<EmbarcacaoTRDTO>(`${this.URL}/tr/detalhes-embarcacao/${uuid}`);
   }

   downloadDeclaracaoProprietario(uuid: string) {
      return this.http.get(`${this.URL}/tr/download/declaracao-proprietario/${uuid}`, {responseType: 'blob'});
   }

}
