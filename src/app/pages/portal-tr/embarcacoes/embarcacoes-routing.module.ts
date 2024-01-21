import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CadastrarEmbarcacaoComponent} from "./cadastrar-embarcacao/cadastrar-embarcacao.component";
import {ListarEmbarcacoesComponent} from "./listar-embarcacoes/listar-embarcacoes.component";
import {DetalhesEmbarcacaoComponent} from "./detalhes-embarcacao/detalhes-embarcacao.component";

const routes: Routes = [
   {
      path: '',
      component: ListarEmbarcacoesComponent
   },
   {
      path: 'cadastrar',
      component: CadastrarEmbarcacaoComponent
   },
   {
      path: 'detalhes-embarcacao/:uuid',
      component: DetalhesEmbarcacaoComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class EmbarcacoesRoutingModule {}
