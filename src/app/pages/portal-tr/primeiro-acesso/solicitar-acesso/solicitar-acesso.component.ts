import {Component} from '@angular/core';
import {LoadingService} from "../../../../core/services/loading.service";
import {Router} from "@angular/router";
import {HabilitarTRDTO} from "../../../../core/dtos/habilitar-tr.dto";
import {TrService} from "../../../../core/services/tr.service";
import {LoginService} from "../../../../core/services/login.service";
import {AuthService} from "../../../../core/services/auth/auth.service";
import {ResponseStatus} from "../../../../core/dtos/response.dto";

import Swal from "sweetalert2";

@Component({
   selector: 'pnip-tr-solicitar-acesso',
   templateUrl: './solicitar-acesso.component.html',
   styleUrls: []
})
export class SolicitarAcessoComponent {

   public breadcrumb = [
      {
         label: 'Home',
         url: '/portal-tr/primeiro-acesso/solicitar',
         home: true
      },
      {
         label: 'Primeiro acesso',
         url: '/portal-tr/primeiro-acesso/solicitar'
      },
      {
         label: 'Solicitar Habilitação de Técnico Responsável',
         active: true
      }
   ];

   constructor(private trService: TrService, private loadingService: LoadingService, private router: Router,
               private loginService: LoginService, private auth: AuthService) {}

   salvar(dto: HabilitarTRDTO) {
      this.loadingService.show = true;
      this.trService.solicitarHabilitacao(dto).subscribe(
         (response) => {
            this.loadingService.show = false;
            if (response.status === ResponseStatus.SUCCESS) {
               if (this.auth.usuarioLogado()) {
                  this.router.navigate(['/portal-tr/primeiro-acesso/minhas-solicitacoes'], {queryParams: {message: 'true'}});
               } else {
                  this.loginService.login();
               }
            } else {
               Swal.fire('Atenção', response.msg, 'error').then();
            }

         }
      );
   }

}
