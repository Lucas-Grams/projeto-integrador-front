import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ResponseDTO} from "../dtos/response.dto";
import {HabilitarTRDTO} from "../dtos/habilitar-tr.dto";

@Injectable({
   providedIn: 'root'
})
export class TrService {

   // private readonly URL = `${environment.rabappApiUrl}/tr`;
   private readonly URL = `http://localhost:8089/tr`;

   constructor(private http: HttpClient) {}

   public solicitarHabilitacao(dto: HabilitarTRDTO) {
      return this.http.post<ResponseDTO<string>>(`${this.URL}/solicitar-habilitacao`, dto);
   }

}
