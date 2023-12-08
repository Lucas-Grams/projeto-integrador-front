import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TrComponent} from "./tr.component";
import {TrRoutingModule} from "./tr-routing.module";

@NgModule({
   declarations: [
      TrComponent,
   ],
   imports: [
      CommonModule,
      TrRoutingModule
   ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrModule {}
