import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {EmbarcacaoDTO} from "../dtos/embarcacao.dto";
import {ResponseDTO} from "../dtos/response.dto";

@Injectable({
   providedIn: 'root'
})
export class EmbarcacaoService {

   // private readonly URL = `${environment.rabappApiUrl}/embarcacao`;
   private readonly URL = `http://localhost:8089/embarcacao`;

   constructor(private http: HttpClient) {}

   public findAllEmbarcacaoByRgpTieNome(filtro: string) {
      return this.http.get<ResponseDTO<EmbarcacaoDTO[]>>(`${this.URL}/buscar/${filtro}`);
   }

}
