import {Injectable, Injector} from '@angular/core';
import {
   HttpRequest,
   HttpHandler,
   HttpEvent,
   HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "../../../core/services/auth/auth.service";
import {LoginService} from "../../../core/services/login.service";



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

   constructor(private injector: Injector) {

   }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     const loginService = this.injector.get(LoginService);
    return next.handle(request).pipe(
       catchError( err => {
          if(err.status == 403 || err.status == 0 || err.status == 401) {
            loginService.logout();
          }
          return throwError(() => new Error(err));
       })
    )
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
