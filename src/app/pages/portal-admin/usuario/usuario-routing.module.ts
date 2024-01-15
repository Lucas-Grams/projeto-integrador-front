import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
const routes: Routes = [
   {
      // path: '',
      // component: ListarUnidadesComponent
   },
   {
      // path: 'cadastrar-nova-unidade',
      // component: FormUnidadeComponent
   },
   {
      // path: 'editar/:uuid',
      // component: FormEditarUnidadeComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class UsuarioRoutingModule {}
