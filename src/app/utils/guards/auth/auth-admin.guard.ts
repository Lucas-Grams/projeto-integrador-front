import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../../core/services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
   constructor(private auth: AuthService) {
   }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.auth.getRealmAccess().includes('admin')){
       this.auth.logout();
    }
    return true;
  }

}
