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
import {OAuthModule} from 'angular-oauth2-oidc';
import {EnvServiceProvider} from "./core/services/env/env.service.provider";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./utils/interceptors/auth/auth.interceptor";
import {AuthGuard} from "./utils/guards/auth/auth.guard";
import {AuthServiceProvider} from "./core/services/auth/auth.service.provider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "./shared/shared.module";


const browserWindow: any = window || {};



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
        OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: [browserWindow['__env'].url.api],
                sendAccessToken: true
            }
        }),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],

   providers: [
      LoadingService,
      LoginService,
      HttpClientModule,
      EnvServiceProvider,
      AuthServiceProvider,
      AuthGuard,
      {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},

   ],
   bootstrap: [PnipComponent],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PnipModule {}
