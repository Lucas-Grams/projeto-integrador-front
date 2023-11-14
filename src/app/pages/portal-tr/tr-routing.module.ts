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
         }
      ]
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class TrRoutingModule {}
