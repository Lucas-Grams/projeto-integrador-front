import {Injectable} from "@angular/core";
import {Unidade} from "../models/unidade.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseDto} from "../dto/response.dto";
import {Usuario} from "../models/usuario.model";
import {UnidadeUsuario} from "../models/unidade-usuario.model";
import {Empresa} from "../models/empresa.model";
import {EmpresaUsuario} from "../models/empresa-usuario.model";

const URL= "http://localhost:8089";
@Injectable({
    providedIn: 'root'
})
export class EmpresaService {
    private readonly urlEmpresa = URL + "/empresa";
    private http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    findAll():Observable<Empresa[]>{
        return this.http.get<Empresa[]>(`${this.urlEmpresa}` + '/findAll');
    }

    findEmpresaByUuid(uuid: String):Observable<Empresa>{
        return this.http.get<Empresa>(`${this.urlEmpresa}` + '/findEmpresaByUuid/'+ uuid);
    }

    ativaInativa(uuid?: String):Observable<ResponseDto>{
        return this.http.post<ResponseDto>(`${this.urlEmpresa}` + '/ativaInativa',uuid);
    }

    salvar(empresa: EmpresaUsuario[]):Observable<ResponseDto>{
        return this.http.post<ResponseDto>(`${this.urlEmpresa}` + '/salvar', empresa);
    }

    findUsuariosByUuidEmpresa(uuid: String):Observable<EmpresaUsuario[]>{
        return this.http.get<EmpresaUsuario[]>(`${this.urlEmpresa}` + '/findUsuariosByUuidEmpresa/'+ uuid);
    }
}
