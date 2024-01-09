import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Endereco} from "../models/endereco.model";

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

   // findAddress(end: Endereco, onComplete?: () => void): Endereco {
   //    // quase sempre o número será undefined, pois o usuário preenche o cep antes dele
   //    const address = [end.rua, end.numero || '', end.bairro, end.cidade, end.uf].join(' ');
   //    new google.maps.Geocoder().geocode({'address': address}, (results, status) => {
   //       if (status === google.maps.GeocoderStatus.OK) {
   //          end.latitude = results[0].geometry.location.lat().toString();
   //          end.longitude = results[0].geometry.location.lng().toString();
   //       } else {
   //          end.longitude = '-29.722893161784278';
   //          end.latitude = '-53.718200838623034';
   //       }
   //       if (onComplete) {
   //          onComplete();
   //       }
   //    });
   //    return end;
   // }

}
