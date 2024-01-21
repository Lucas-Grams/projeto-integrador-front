import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {EmbarcacoesRoutingModule} from "./embarcacoes-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";
import {TrService} from "../../../core/services/tr.service";
import {ListarEmbarcacoesComponent} from "./listar-embarcacoes/listar-embarcacoes.component";
import {CadastrarEmbarcacaoComponent} from "./cadastrar-embarcacao/cadastrar-embarcacao.component";
import {DetalhesEmbarcacaoComponent} from "./detalhes-embarcacao/detalhes-embarcacao.component";

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
