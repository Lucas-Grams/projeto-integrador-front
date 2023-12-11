import { Injectable } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {EnvService} from "../env/env.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private oidcSecurityService: OAuthService, private env: EnvService) {

  }

  init(){
     const cutUrl = window.document.URL.split('/');
     let urlPortal = cutUrl[0] + '//' + cutUrl[2] + '/';
     if (cutUrl[3] !== '#' && cutUrl[3]) {
        urlPortal = urlPortal + cutUrl[3] + '/';
     }

     const authCodeFlowConfig = {
        issuer: `${this.env.keycloak.url}/realms/${this.env.keycloak.realm}`,
        redirectUri: `${urlPortal}`,
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
     });
  }

   login() {
      this.keycloakLoginSSO();
   }

   getName(){
     if(this.usuarioLogado()){
        return this.oidcSecurityService.getIdentityClaims()['name'];
     }
     return '';
   }

   usuarioLogado(): boolean {
      return this.oidcSecurityService.hasValidAccessToken();
   }
   logout() {
      this.oidcSecurityService.logOut();
   }
  private keycloakLoginSSO() {
     //evita login antes de carregar o token
     if(!window.location.href.includes('state')){
        this.oidcSecurityService.initLoginFlow();
     }
  }
   keycloackgetToken(){
     return this.oidcSecurityService.getAccessToken();
   }
}
