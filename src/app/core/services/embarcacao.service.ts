import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {EmbarcacaoDTO} from "../dtos/embarcacao.dto";
import {ResponseDTO} from "../dtos/response.dto";
import {EnvService} from "./env/env.service";

@Injectable({
   providedIn: 'root'
})
export class EmbarcacaoService {

   // TODO: environment baseUrl
   private URL: string = ``;

   constructor(private http: HttpClient, private env: EnvService) {
         this.URL = `${this.env.url.api}/embarcacao`;
   }

   public findAllEmbarcacaoByRgpTieNome(filtro: string) {
      return this.http.get<ResponseDTO<EmbarcacaoDTO[]>>(`${this.URL}/buscar/${filtro}`);
   }

}
