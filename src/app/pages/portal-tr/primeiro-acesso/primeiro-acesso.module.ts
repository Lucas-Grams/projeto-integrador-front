import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {PrimeiroAcessoRoutingModule} from "./primeiro-acesso-routing.module";
import {SolicitarAcessoComponent} from "./solicitar-acesso/solicitar-acesso.component";
import {ListarSolicitacoesComponent} from "./listar-solicitacoes/listar-solicitacoes.component";
import {FormSolicitarAcessoComponent} from "./form-solicitar-acesso/form-solicitar-acesso.component";
import {PrimeiroAcessoComponent} from "./primeiro-acesso.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
   declarations: [
      PrimeiroAcessoComponent,
      SolicitarAcessoComponent,
      ListarSolicitacoesComponent,
      FormSolicitarAcessoComponent
   ],
   imports: [
      SharedModule,
      CommonModule,
      ReactiveFormsModule,
      PrimeiroAcessoRoutingModule
   ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrimeiroAcessoModule {}
