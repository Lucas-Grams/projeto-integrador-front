import {Injectable} from "@angular/core";
import {Unidade} from "../models/unidade.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseDto} from "../dto/response.dto";
import {Usuario} from "../models/usuario.model";
import {UnidadeUsuario} from "../models/UnidadeUsuario.model";
import {EnvService} from "./env/env.service";

const URL= "http://localhost:8089";
@Injectable({
   providedIn: 'root'
})
export class UsuarioService {
   private urlUsuario: string;
   private http: HttpClient;

   constructor(http: HttpClient, private env: EnvService) {
      this.urlUsuario = this.env.url.api +  "/usuario";
      this.http = http;
   }

   findAll():Observable<Usuario[]>{
      return this.http.get<Usuario[]>(`${this.urlUsuario}` + '');
   }

   findByUuid(uuid: String):Observable<Usuario>{
      return this.http.get<Usuario>(`${this.urlUsuario}`+ '/find-by-uuid/' + uuid);
   }

   findUsuariosUnidade(uuid?: String):Observable<Usuario[]>{
      return this.http.get<Usuario[]>(`${this.urlUsuario}` + '/find-usuarios-unidade/'+ uuid);
   }

   findUsuariosDip():Observable<Usuario[]>{
      return this.http.get<Usuario[]>(`${this.urlUsuario}` + '/find-usuarios-dip');
   }

   findUnidadesByUsuarioUuid(uuid: String):Observable<UnidadeUsuario[]>{
      return this.http.get<UnidadeUsuario[]>(`${this.urlUsuario}` + '/find-unidades-by-usuario-uuid/'+ uuid);
   }

   salvar(unidadeUsuario: UnidadeUsuario[]):Observable<ResponseDto>{
      return this.http.post<ResponseDto>(`${this.urlUsuario}` + '/salvar-ssuario', unidadeUsuario);
   }

   ativaInativa(uuid?: String):Observable<ResponseDto>{
      return this.http.post<ResponseDto>(`${this.urlUsuario}` + '/ativa-inativa',uuid);
   }
}
