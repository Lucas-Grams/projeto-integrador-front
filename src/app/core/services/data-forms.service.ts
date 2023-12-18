import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
   providedIn: 'root'
})
export class DataFormsService {

   constructor(private http: HttpClient) {}

   getJson(data: string) {
      return this.http.get('/assets/data-forms/' + data + '.json');
   }

}
