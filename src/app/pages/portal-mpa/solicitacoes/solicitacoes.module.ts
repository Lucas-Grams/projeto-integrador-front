import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {SolicitacoesComponent} from "./solicitacoes.component";

import {SharedModule} from "../../../shared/shared.module";
import {SolicitacoesRoutingModule} from "./solicitacoes-routing.module";

import {TrService} from "../../../core/services/tr.service";
import {ViewSolicitacaoComponent} from "./view-solicitacao/view-solicitacao.component";
import {ListSolicitacoesComponent} from "./list-solicitacoes/list-solicitacoes.component";

@NgModule({
   declarations: [
      SolicitacoesComponent,
      ViewSolicitacaoComponent,
      ListSolicitacoesComponent
   ],
   imports: [
      FormsModule,
      SharedModule,
      CommonModule,
      ReactiveFormsModule,
      SolicitacoesRoutingModule
   ],
   providers: [
      TrService
   ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SolicitacoesModule {}
