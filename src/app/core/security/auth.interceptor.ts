import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // Você pode modificar a solicitação aqui antes de ser enviada
        // Exemplo: adicionar cabeçalhos, tokens, etc.

        // Encaminhe a solicitação para o próximo manipulador na cadeia
        return next.handle(request);
    }
}
