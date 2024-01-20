import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseDto} from "../dto/response.dto";
import {Usuario} from "../models/usuario.model";
import {EnvService} from "./env/env.service";
import {UnidadeUsuario} from "../models/unidade-usuario.model";

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

   findUsuariosEmpresas():Observable<Usuario[]> {
      return this.http.get<Usuario[]>(`${this.urlUsuario}` + '/find-usuarios-empresas');
   }

   findUnidadesByUsuarioUuid(uuid: String):Observable<UnidadeUsuario[]>{
      return this.http.get<UnidadeUsuario[]>(`${this.urlUsuario}` + '/find-unidades-by-usuario-uuid/'+ uuid);
   }

   salvar(unidadeUsuario: UnidadeUsuario[]):Observable<ResponseDto>{
      return this.http.post<ResponseDto>(`${this.urlUsuario}` + '/salvar-usuario', unidadeUsuario);
   }

   ativaInativa(uuid?: String):Observable<ResponseDto>{
      return this.http.post<ResponseDto>(`${this.urlUsuario}` + '/ativa-inativa',uuid);
   }
}
