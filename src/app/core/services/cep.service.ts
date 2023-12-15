import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

export type ViaCEPResponse = {
   cep: string,
   logradouro: string,
   complemento: string,
   bairro: string,
   localidade: string,
   uf: string,
   ibge: string,
   gia: string,
   ddd: string,
   siafi: string,
   erro: boolean
}

@Injectable({
   providedIn: 'root'
})
export class CepService {

   private readonly URL = 'https://viacep.com.br/ws/${CEP}/json/';

   constructor(private http: HttpClient) {}

   public getAddrress(cep: string) {
      return this.http.get<ViaCEPResponse>(this.URL.replace('${CEP}', cep));
   }

}
