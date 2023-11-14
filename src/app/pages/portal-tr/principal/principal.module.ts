import {NgModule} from '@angular/core';
import {PrincipalComponent} from "./principal.component";
import {PrincipalRoutingModule} from "./principal-routing.module";

@NgModule({
   declarations: [
      PrincipalComponent
   ],
   imports: [
      PrincipalRoutingModule
   ]
})
export class PrincipalModule {}
