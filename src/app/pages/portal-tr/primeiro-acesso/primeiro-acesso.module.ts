import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {PrimeiroAcessoRoutingModule} from "./primeiro-acesso-routing.module";
import {SolicitarAcessoComponent} from "./solicitar-acesso/solicitar-acesso.component";
import {ListarSolicitacoesComponent} from "./listar-solicitacoes/listar-solicitacoes.component";
import {FormSolicitarAcessoComponent} from "./form-solicitar-acesso/form-solicitar-acesso.component";
import {PrimeiroAcessoComponent} from "./primeiro-acesso.component";
import {DadosPessoaisComponent} from "./form-solicitar-acesso/dados-pessoais/dados-pessoais.component";
import {DadosProfissionaisComponent} from "./form-solicitar-acesso/dados-profissionais/dados-profissionais.component";
import {RevisarSolicitacaoComponent} from "./form-solicitar-acesso/revisar-solicitacao/revisar-solicitacao.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";
import {TrService} from "../../../core/services/tr.service";
import {DetalhesSolicitacaoComponent} from "./detalhes-solicitacao/detalhes-solicitacao.component";

@NgModule({
   declarations: [
      PrimeiroAcessoComponent,
      SolicitarAcessoComponent,
      ListarSolicitacoesComponent,
      FormSolicitarAcessoComponent,
      DadosPessoaisComponent,
      DadosProfissionaisComponent,
      RevisarSolicitacaoComponent,
      DetalhesSolicitacaoComponent
   ],
   imports: [
      FormsModule,
      SharedModule,
      CommonModule,
      ReactiveFormsModule,
      PrimeiroAcessoRoutingModule
   ],
   providers: [
      TrService
   ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrimeiroAcessoModule {}
