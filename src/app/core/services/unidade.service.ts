import {Injectable} from "@angular/core";
import {Unidade} from "../models/unidade.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseDto} from "../dto/response.dto";

const URL= "http://localhost:8089"
@Injectable()
export class UnidadeService{
   private readonly urlUnidade = URL+"/unidade";
   private http: HttpClient;
   constructor(http: HttpClient) {
      this.http = http;
   }
      salvar(unidade: Unidade):Observable<ResponseDto<Unidade>>{
         return this.http.put<ResponseDto<Unidade>>(this.urlUnidade + '/salvar', unidade);
      }

}
