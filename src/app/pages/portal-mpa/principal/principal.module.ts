import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {PrincipalRoutingModule} from "./principal-routing.module";
import {PrincipalComponent} from "./principal.component";
import {CommonModule} from "@angular/common";

@NgModule({
   declarations: [
      PrincipalComponent
   ],
    imports: [
       CommonModule,
       PrincipalRoutingModule
    ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrincipalModule {}
