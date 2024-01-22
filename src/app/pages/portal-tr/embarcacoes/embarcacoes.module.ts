import {CommonModule} from "@angular/common";
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {SharedModule} from "../../../shared/shared.module";
import {EmbarcacoesRoutingModule} from "./embarcacoes-routing.module";

import {TrService} from "../../../core/services/tr.service";
import {ListarEmbarcacoesComponent} from "./listar-embarcacoes/listar-embarcacoes.component";
import {DetalhesEmbarcacaoComponent} from "./detalhes-embarcacao/detalhes-embarcacao.component";
import {CadastrarEmbarcacaoComponent} from "./cadastrar-embarcacao/cadastrar-embarcacao.component";

@NgModule({
   declarations: [
      ListarEmbarcacoesComponent,
      CadastrarEmbarcacaoComponent,
      DetalhesEmbarcacaoComponent
   ],
   imports: [
      FormsModule,
      SharedModule,
      CommonModule,
      ReactiveFormsModule,
      EmbarcacoesRoutingModule
   ],
   providers: [
      TrService
   ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmbarcacoesModule {}
