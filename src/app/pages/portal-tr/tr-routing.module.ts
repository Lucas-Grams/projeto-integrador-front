import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TrComponent} from "./tr.component";

const routes: Routes = [
   {
      path: '',
      component: TrComponent,
      children: [
         {
            path: '',
            loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalModule)
         },
         {
            path: 'primeiro-acesso',
            loadChildren: () => import('./primeiro-acesso/primeiro-acesso.module').then(m => m.PrimeiroAcessoModule)
         },
         {
            path: 'embarcacoes',
            loadChildren: () => import('./embarcacoes/embarcacoes.module').then(m => m.EmbarcacoesModule)
         }
      ]
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class TrRoutingModule {}
