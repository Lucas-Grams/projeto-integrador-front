import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {CustomValueAccessorDirective} from "../utils/directives/CustomValueAccessor.directives";
import {ValidatorsFormsUtils} from "../utils/components/validators-forms.utils";
import {BrSelectComponent} from "./br-select/br-select.component";
import {DataFormsService} from "../core/services/data-forms.service";
import {StatusSolicitacaoUtils} from "../utils/components/status-solicitacao.utils";

@NgModule({
   declarations: [
      BrSelectComponent,
      ValidatorsFormsUtils,
      StatusSolicitacaoUtils,
      CustomValueAccessorDirective
   ],
   imports: [
      CommonModule,
      HttpClientModule
   ],
   exports: [
      BrSelectComponent,
      ValidatorsFormsUtils,
      CustomValueAccessorDirective,
      StatusSolicitacaoUtils
   ],
   providers: [
      DataFormsService
   ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
}
