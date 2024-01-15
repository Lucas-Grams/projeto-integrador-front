import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, NgSelectOption, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";
import {UnidadeService} from "../../../core/services/unidade.service";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {NgSelectModule} from "@ng-select/ng-select";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {NguiMapModule} from "@ngui/map";



@NgModule({
   declarations: [

   ],
   imports: [
      SharedModule,
      CommonModule,
      ReactiveFormsModule,
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
export class UsuarioModule {}
