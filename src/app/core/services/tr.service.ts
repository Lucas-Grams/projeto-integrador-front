import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {EnvService} from "./env/env.service";

import {ResponseDTO} from "../dtos/response.dto";
import {HabilitarTRDTO} from "../dtos/habilitar-tr.dto";
import {SolicitacaoHabilitacaoDTO} from "../dtos/solicitacao-habilitacao.dto";

@Injectable({
   providedIn: 'root'
})
export class TrService {

   private URL = ``;

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

   public findAllSolicitacoes(): any {
      return this.http.get<ResponseDTO<any>>(`${this.URL}/find/all/solicitacoes`);
   }

   public findSolicitacoesByStatus(status: []): any {
      return this.http.get<ResponseDTO<any>>(`${this.URL}/find/solicitacoes/by/status/`+ status);
   }

   public findSolicitacaoByUuid(uuid: string): any {
      return this.http.get<ResponseDTO<any>>(`${this.URL}/find/solicitacao/by/uuid/` + uuid);
   }

   public findStatusUltimaSolicitacao() {
      return this.http.get<ResponseDTO<string>>(`${this.URL}/find/status/ultima/solicitacao`);
   }

   public finalizarSolicitacao(dto: any) {
      return this.http.post<ResponseDTO<string>>(`${this.URL}/finalizar-solicitacao`, dto);
   }

   downloadAnexo(uuid: string, nome: string) {
      return this.http.get(`${this.URL}/download/anexos/${uuid}/${nome}`, {responseType: 'blob'});
   }

}
