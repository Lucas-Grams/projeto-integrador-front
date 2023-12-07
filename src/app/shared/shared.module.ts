import {NgModule} from "@angular/core";
import {CustomValueAccessorDirective} from "../utils/directives/CustomValueAccessor.directives";
import {HttpHandler} from "@angular/common/http";

@NgModule({
  declarations: [
     CustomValueAccessorDirective
  ],
  imports: [],
  exports: [
     CustomValueAccessorDirective
  ],
  providers: [],
})
export class SharedModule {}
