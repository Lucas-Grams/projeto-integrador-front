import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ResponseDTO} from "../dtos/response.dto";
import {HabilitarTRDTO} from "../dtos/habilitar-tr.dto";
import {SolicitacaoHabilitacaoDTO} from "../dtos/solicitacao-habilitacao.dto";
import {EnvService} from "./env/env.service";

@Injectable({
   providedIn: 'root'
})
export class TrService {

   // TODO: environment baseUrl
   private  URL = ``;

   constructor(private http: HttpClient, private env: EnvService) {
      this.URL = `${this.env.url.api}/tr`
   }

   public minhasSolicitacoes() {
      return this.http.get<SolicitacaoHabilitacaoDTO[]>(`${this.URL}/minhas-solicitacoes`);
   }

   public detalhesSolicitacao(uuid: string) {
      return this.http.get<HabilitarTRDTO>(`${this.URL}/detalhes-solicitacao/${uuid}`);
   }

   public solicitarHabilitacao(dto: HabilitarTRDTO) {
      return this.http.post<ResponseDTO<string>>(`${this.URL}/solicitar-habilitacao`, dto);
   }

}
