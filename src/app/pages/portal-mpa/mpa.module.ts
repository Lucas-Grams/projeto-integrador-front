import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MpaComponent} from "./mpa.component";
import {MpaRoutingModule} from "./mpa-routing.module";

@NgModule({
   declarations: [
      MpaComponent,
   ],
   imports: [
      CommonModule,
      MpaRoutingModule
   ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MpaModule {}
