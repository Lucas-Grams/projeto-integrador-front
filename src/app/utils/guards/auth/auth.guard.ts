import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../../../core/services/auth/auth.service";


@Injectable()
export class AuthGuard implements CanActivate {

   constructor(private auth: AuthService) {}

   canActivate(activeRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {

      const isLogado = this.auth.usuarioLogado();
      if (!isLogado) {
         this.auth.logout();
      }
      return true;
   }
}
