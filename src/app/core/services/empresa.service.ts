import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ResponseDto} from "../dto/response.dto";
import {Empresa} from "../models/empresa.model";
import {EmpresaUsuario} from "../models/empresa-usuario.model";
import {EnvService} from "./env/env.service";

@Injectable({
   providedIn: 'root'
})
export class EmpresaService {

   private urlEmpresa: string;
   private http: HttpClient;

   constructor(http: HttpClient, private env: EnvService) {
      this.urlEmpresa = this.env.url.api +  "/empresa";
      this.http = http;
   }

   findAll():Observable<Empresa[]>{
        return this.http.get<Empresa[]>(`${this.urlEmpresa}` + '/find-all');
    }

    findEmpresaByUuid(uuid: String):Observable<Empresa>{
        return this.http.get<Empresa>(`${this.urlEmpresa}` + '/find-empresa-by-uuid/'+ uuid);
    }

    ativaInativa(uuid?: String):Observable<ResponseDto>{
        return this.http.post<ResponseDto>(`${this.urlEmpresa}` + '/ativa-inativa',uuid);
    }

    salvar(empresa: EmpresaUsuario[]):Observable<ResponseDto>{
        return this.http.post<ResponseDto>(`${this.urlEmpresa}` + '/salvar', empresa);
    }

    findUsuariosByUuidEmpresa(uuid: String):Observable<EmpresaUsuario[]>{
        return this.http.get<EmpresaUsuario[]>(`${this.urlEmpresa}` + '/find-usuarios-by-uuid-empresa/'+ uuid);
    }
}
