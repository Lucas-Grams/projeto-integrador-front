import {Injectable} from "@angular/core";
import {Unidade} from "../models/unidade.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseDto} from "../dto/response.dto";
import {Usuario} from "../models/usuario.model";
import {UnidadeUsuario} from "../models/UnidadeUsuario.model";

const URL= "http://localhost:8089";
@Injectable({
   providedIn: 'root'
})
export class UsuarioService {
   private readonly urlUsuario = URL + "/usuario";
   private http: HttpClient;

   constructor(http: HttpClient) {
      this.http = http;
   }

   findAll():Observable<Usuario[]>{
      return this.http.get<Usuario[]>(`${this.urlUsuario}` + '');
   }

   findByUuid(uuid: String):Observable<Usuario>{
      return this.http.get<Usuario>(`${this.urlUsuario}`+ '/findByUuid/' + uuid);
   }

   findUsuariosUnidade(uuid?: String):Observable<Usuario[]>{
      return this.http.get<Usuario[]>(`${this.urlUsuario}` + '/findUsuariosUnidade/'+ uuid);
   }

   findUsuariosDip():Observable<Usuario[]>{
      return this.http.get<Usuario[]>(`${this.urlUsuario}` + '/findUsuariosDip');
   }

   findUnidadesByUsuarioUuid(uuid: String):Observable<UnidadeUsuario[]>{
      return this.http.get<UnidadeUsuario[]>(`${this.urlUsuario}` + '/findUnidadesByUsuarioUuid/'+ uuid);
   }

   salvar(unidadeUsuario: UnidadeUsuario[]):Observable<ResponseDto>{
      return this.http.post<ResponseDto>(`${this.urlUsuario}` + '/salvarUsuario', unidadeUsuario);
   }
}
