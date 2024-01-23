import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, NgSelectOption, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";
import {UnidadeService} from "../../../core/services/unidade.service";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {NgSelectModule} from "@ng-select/ng-select";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {NguiMapModule} from "@ngui/map";
import {EmpresaRoutingModule} from "./empresa-routing.module";
import {ListarEmpresasComponent} from "./listar-empresas/listar-empresas.component";
import {FormEmpresaComponent} from "./form-empresa/form-empresa.component";
import {FormUsuarioEmpresaComponent} from "./form-empresa/form-usuario-empresa/form-usuario-empresa.component";
import {FormEditarEmpresaComponent} from "./form-empresa/form-editar-empresa/form-editar-empresa.component";

@NgModule({
    declarations: [
        ListarEmpresasComponent,
        FormEmpresaComponent,
        FormUsuarioEmpresaComponent,
        FormEditarEmpresaComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        ReactiveFormsModule,
        EmpresaRoutingModule,
        HttpClientModule,
        FormsModule,
        NgSelectModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
        }),
        NguiMapModule,
        NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyCMyG1h3lMnkv9fYUelTjDe9IXwpxpa0-U&libraries=visualization,drawing'})
    ],
    providers: [
        UnidadeService,
        ToastrService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmpresaModule {}
