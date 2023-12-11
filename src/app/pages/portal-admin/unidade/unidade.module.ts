import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, NgSelectOption, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";
import {UnidadeRoutingModule} from "./unidade-routing.module";
import {ListarUnidadesComponent} from "./listar-unidades/listar-unidades.component";
import {FormUnidadeComponent} from "./form-unidade/form-unidade.component";
import {UnidadeService} from "../../../core/services/unidade.service";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";


@NgModule({
   declarations: [
      ListarUnidadesComponent,
      FormUnidadeComponent
   ],
   imports: [
      SharedModule,
      CommonModule,
      ReactiveFormsModule,
      UnidadeRoutingModule,
      HttpClientModule,
      FormsModule
   ],
   providers: [
       UnidadeService,
   ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnidadeModule {}
