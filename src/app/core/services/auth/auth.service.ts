import {Injectable} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {EnvService} from "../env/env.service";
import {forkJoin} from "rxjs";


@Injectable({
   providedIn: 'root'
})
export class AuthService {

   constructor(private oidcSecurityService: OAuthService, private env: EnvService) {

   }

   init() {
      return new Promise((resolve, reject) => {
         const authCodeFlowConfig = {
            issuer: `${this.env.keycloak.url}/realms/${this.env.keycloak.realm}`,
            redirectUri: this.env.url.home,
            clientId: this.env.keycloak.clientId,
            responseType: 'code',
            scope: 'openid profile email offline_access',
            showDebugInformation: false,
            //dummyClientSecret: environment.keycloak.clientSecret,
            timeoutFactor: 0.7
         };
         this.oidcSecurityService.configure(authCodeFlowConfig);
         this.oidcSecurityService.setStorage(localStorage);
         this.oidcSecurityService.loadDiscoveryDocumentAndTryLogin().then(r => {
            this.oidcSecurityService.setupAutomaticSilentRefresh();
            resolve(true);
         });
      });
   }

   login() {
      this.keycloakLoginSSO();
   }

   getName() {
      if (this.usuarioLogado()) {
         return this.oidcSecurityService.getIdentityClaims()['name'];
      }
      return '';
   }

   usuarioLogado(): boolean {
      return this.oidcSecurityService.hasValidAccessToken();
   }

   asynccheckLogado() {
      return new Promise((resolve, reject) => {
         this.oidcSecurityService.loadDiscoveryDocument().then(r => {
            resolve(this.oidcSecurityService.hasValidAccessToken());
         }).catch(err => {
            resolve(this.oidcSecurityService.hasValidAccessToken());
         });
      });
   }

   logout() {
      this.oidcSecurityService.logOut();
   }

   private keycloakLoginSSO() {
      //evita login antes de carregar o token
      if (!window.location.href.includes('state')) {
         this.oidcSecurityService.initLoginFlow();
      }
   }

   keycloackgetToken() {
      return this.oidcSecurityService.getAccessToken();
   }

   private decodeJwtToken(token: string): any {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
   }

   getRealmAccess() {
      return this.decodeJwtToken(this.oidcSecurityService.getAccessToken()).realm_access.roles;
   }

   isConvidado() {
      return this.getRealmAccess().includes('convidado');
   }
}
