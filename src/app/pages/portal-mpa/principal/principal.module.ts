import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {PrincipalRoutingModule} from "./principal-routing.module";

import {NgForOf} from "@angular/common";

import {PrincipalComponent} from "./principal.component";

@NgModule({
   declarations: [
      PrincipalComponent
   ],
    imports: [
        PrincipalRoutingModule,
        NgForOf
    ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrincipalModule {}
