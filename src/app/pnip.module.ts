import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {PnipRoutingModule} from "./pnip-routing.module";
import {PnipComponent} from './pnip.component';
import {HeaderComponent} from "./layout/header/header.component";
import {NotFoundComponent} from "./layout/not-found/not-found.component";
import {LoginComponent} from "./pages/login/login.component";
import {LoginService} from "./core/services/login.service";
import {LoadingService} from "./core/services/loading.service";
import {LoadingComponent} from "./layout/loading/loading.component";
import {EnvServiceProvider} from "./core/services/env/env.service.provider";
import {OAuthModule} from 'angular-oauth2-oidc';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./core/interceptor/auth/auth.interceptor";
@NgModule({
   declarations: [
      LoginComponent,
      PnipComponent,
      HeaderComponent,
      NotFoundComponent,
      LoadingComponent
   ],
   imports: [
      BrowserModule,
      PnipRoutingModule,
      OAuthModule.forRoot(),
      HttpClientModule
   ],
   providers: [
      LoadingService,
      LoginService,
      HttpClientModule,
      EnvServiceProvider,
      {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
   ],
   bootstrap: [PnipComponent],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PnipModule {}
