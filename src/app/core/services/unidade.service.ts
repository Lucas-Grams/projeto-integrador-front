import {Injectable} from "@angular/core";
import {Unidade} from "../models/unidade.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseDto} from "../dto/response.dto";
import {EnvService} from "./env/env.service";
import {TipoUnidade} from "../models/tipo-unidade.model";
import {UnidadeUsuario} from "../models/unidade-usuario.model";

@Injectable({
   providedIn: 'root'
})
export class UnidadeService{
   private urlUnidade = "";
   private http: HttpClient;
   constructor(http: HttpClient, private env: EnvService) {
      this.http = http;
      this.urlUnidade = `${this.env.url.api}/unidade`;
   }
   salvar(unidade: UnidadeUsuario[]):Observable<ResponseDto<Unidade>>{
      return this.http.post<ResponseDto<Unidade>>(`${this.urlUnidade}` + '/salvar', unidade);
   }

   findAll():Observable<Unidade[]>{
      return this.http.get<Unidade[]>(`${this.urlUnidade}` + '/find-all');
   }

   getGerenciadoras(tipo: String):Observable<Unidade[]>{
      return this.http.get<Unidade[]>(`${this.urlUnidade}` + '/get-gerenciadoras/'+ tipo);
   }

   inativarUnidade(uuid: String){
      return this.http.post(`${this.urlUnidade}` + '/inativar-unidade/', uuid);
   }

   findUnidadeByUuid(uuid: String): Observable<Unidade>{
      return this.http.get<Unidade>(`${this.urlUnidade}` + '/find-unidade-by-uuid/'+ uuid);
   }


   findTiposUnidades():Observable<ResponseDto<TipoUnidade[]>>{
      return this.http.get<ResponseDto<TipoUnidade[]>>(`${this.urlUnidade}` + '/find-all-tipos')
   }

   findUsuariosByUnidadeUuid(uuid: String):Observable<UnidadeUsuario[]>{
   return this.http.get<UnidadeUsuario[]>(`${this.urlUnidade}` + '/find-usuarios-by-unidade-uuid/'+ uuid);
}
}
