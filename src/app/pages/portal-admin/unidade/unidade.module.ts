import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, NgSelectOption, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";
import {UnidadeRoutingModule} from "./unidade-routing.module";
import {ListarUnidadesComponent} from "./listar-unidades/listar-unidades.component";
import {FormUnidadeComponent} from "./form-unidade/form-unidade.component";
import {UnidadeService} from "../../../core/services/unidade.service";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {NgSelectModule} from "@ng-select/ng-select";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {FormEditarUnidadeComponent} from "./form-unidade/form-editar-unidade/form-editar-unidade.component";
import {
   FormRepresentanteUnidadeComponent
} from "./form-unidade/form-representante-unidade/form-representante-unidade.component";


@NgModule({
   declarations: [
      ListarUnidadesComponent,
      FormUnidadeComponent,
      FormEditarUnidadeComponent,
      FormRepresentanteUnidadeComponent
   ],
   imports: [
      SharedModule,
      CommonModule,
      ReactiveFormsModule,
      UnidadeRoutingModule,
      HttpClientModule,
      FormsModule,
      NgSelectModule,
      ToastrModule.forRoot({
         timeOut: 3000,
         positionClass: 'toast-top-right',
         preventDuplicates: true,
      }),
   ],
   providers: [
      UnidadeService,
      ToastrService
   ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnidadeModule {}
