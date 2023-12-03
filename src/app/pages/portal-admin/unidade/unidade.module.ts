import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";
import {UnidadeRoutingModule} from "./unidade-routing.module";
import {ListarUnidadesComponent} from "./listar-unidades/listar-unidades.component";
import {FormUnidadeComponent} from "./form-unidade/form-unidade.component";

@NgModule({
   declarations: [
      ListarUnidadesComponent,
      FormUnidadeComponent
   ],
   imports: [
      SharedModule,
      CommonModule,
      ReactiveFormsModule,
      UnidadeRoutingModule
   ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnidadeModule {}
