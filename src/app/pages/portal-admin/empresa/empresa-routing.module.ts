import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ListarEmpresasComponent} from "./listar-empresas/listar-empresas.component";
import {FormEmpresaComponent} from "./form-empresa/form-empresa.component";
import {FormEditarEmpresaComponent} from "./form-empresa/form-editar-empresa/form-editar-empresa.component";

const routes: Routes = [
    {
        path: '',
        component: ListarEmpresasComponent
    },
    {
        path:'cadastrar-nova-empresa',
        component: FormEmpresaComponent
    },
    {
        path:'editar/:uuid',
        component:FormEditarEmpresaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EmpresaRoutingModule {}
