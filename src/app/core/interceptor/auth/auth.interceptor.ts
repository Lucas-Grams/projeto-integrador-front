import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {EnvService} from "../../services/env/env.service";
import {AuthService} from "../../services/auth/auth.service";
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private env: EnvService, private auth : AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     // verificar se já existe token, nao sobreescrever
     if (request.headers.get('Authorization')) {
        return next.handle(request);
        //se está logado, insere o token e é a url da api
     }else if(this.auth.usuarioLogado() && request.url.startsWith(this.env.url.api)){
        const token = this.auth.keycloackgetToken();
        const authRequest = request.clone(
           {
              setHeaders: {
                 'Authorization': 'Bearer ' + token,
                 'PNIP-Trace-Id': uuidv4(),
              }
           }
        );
        return next.handle(authRequest);
     }
    return next.handle(request);
  }
}
