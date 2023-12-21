import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ListarUnidadesComponent} from "./listar-unidades/listar-unidades.component";
import {FormUnidadeComponent} from "./form-unidade/form-unidade.component";
import {FormEditarUnidadeComponent} from "./form-unidade/form-editar-unidade/form-editar-unidade.component";

const routes: Routes = [
   {
      path: '',
      component: ListarUnidadesComponent
   },
   {
      path: 'cadastrar-nova-unidade',
      component: FormUnidadeComponent
   },
   {  path: 'editar/:uuid',
      component: FormEditarUnidadeComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class UnidadeRoutingModule {}
