import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminComponent} from "./admin.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
   declarations: [
      AdminComponent,
   ],
   imports: [
      CommonModule,
      AdminRoutingModule,
      SharedModule
   ],

   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule {}
