import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ListarUsuariosComponent} from "./listar-usuarios/listar-usuarios.component";
import {FormUsuarioComponent} from "./form-usuarios/form-usuario.component";
import {FormEditarUsuarioComponent} from "./form-usuarios/form-editar-usuario/form-editar-usuario.component";
const routes: Routes = [
   {
      path: '',
      component: ListarUsuariosComponent
   },
   {
      path: 'cadastrar-novo-usuario',
      component: FormUsuarioComponent
   },
   {
      path:'editar/:uuid',
      component:FormEditarUsuarioComponent

   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class UsuarioRoutingModule {}
