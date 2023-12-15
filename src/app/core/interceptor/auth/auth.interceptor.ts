import {Injectable, Injector} from '@angular/core';
import {
   HttpRequest,
   HttpHandler,
   HttpEvent,
   HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from "../../services/auth/auth.service";
import {LoginService} from "../../services/login.service";



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

<<<<<<< Updated upstream
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
=======
  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     const loginService = this.injector.get(AuthService);

>>>>>>> Stashed changes
    return next.handle(request);
  }

   catchExpiredToken(loginService: LoginService) {
      return (err: HttpErrorResponse) => {
         console.log("erro, deu erro");
         if (err instanceof HttpErrorResponse
            && err.status == 403 || err.status == 0 || err.status == 401 || err.status == 302) {
            loginService.logout();
         } else {
            return throwError(err);
         }
         return throwError(err);
      };
   }

}
