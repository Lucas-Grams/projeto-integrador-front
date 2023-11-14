import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {PnipRoutingModule} from "./pnip-routing.module";
import {PnipComponent} from './pnip.component';
import {HeaderComponent} from "./layout/header/header.component";
import {FooterComponent} from "./layout/footer/footer.component";
import {NotFoundComponent} from "./layout/not-found/not-found.component";

@NgModule({
   declarations: [
      PnipComponent,
      HeaderComponent,
      FooterComponent,
      NotFoundComponent
   ],
   imports: [
      BrowserModule,
      PnipRoutingModule
   ],
   providers: [],
   bootstrap: [PnipComponent],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PnipModule {}
