import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminComponent} from "./admin.component";
import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClient, HttpHandler} from "@angular/common/http";
import {AuthInterceptor} from "../../core/security/auth.interceptor";

@NgModule({
   declarations: [
      AdminComponent,
   ],
   imports: [
      CommonModule,
      AdminRoutingModule
   ],
   providers: [
       HttpClient,{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},   ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule {}
