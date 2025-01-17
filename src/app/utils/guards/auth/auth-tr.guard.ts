import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../../core/services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthTrGuard implements CanActivate {
   constructor(private auth: AuthService) {
   }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     if(this.auth.getRealmAccess().includes('tr') || this.auth.getRealmAccess().includes('convidado')){
        return true
     }
     this.auth.logout();
    return false;
  }

}
