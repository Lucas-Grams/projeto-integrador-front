import {Injectable} from "@angular/core";
import {Unidade} from "../models/unidade.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseDto} from "../dto/response.dto";
import {Usuario} from "../models/usuario.model";

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

   findUsuariosUnidade(uuid?: String):Observable<Usuario[]>{
      return this.http.get<Usuario[]>(`${this.urlUsuario}` + '/findUsuariosUnidade/'+ uuid);
   }

   findUsuariosDip():Observable<Usuario[]>{
      return this.http.get<Usuario[]>(`${this.urlUsuario}` + '/findUsuariosDip');
   }
}
