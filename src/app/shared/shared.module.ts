import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {CustomValueAccessorDirective} from "../utils/directives/CustomValueAccessor.directives";
import {ValidatorsFormsUtils} from "../utils/components/validators-forms.utils";

@NgModule({
  declarations: [
     ValidatorsFormsUtils,
     CustomValueAccessorDirective
  ],
  imports: [
     CommonModule,
     HttpClientModule
  ],
  exports: [
     ValidatorsFormsUtils,
     CustomValueAccessorDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
