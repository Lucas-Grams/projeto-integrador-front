import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";

const routes: Routes = [
   {
      path: '',
      component: AdminComponent,
      children: [
         {
            path: '',
            loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalModule)
         },
         {
            path: 'unidades',
            loadChildren: () => import('./unidade/unidade.module').then(m => m.UnidadeModule)
         }
      ]
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class AdminRoutingModule {}
