import {Component, OnInit} from '@angular/core';
import {LoadingService} from "../../../../core/services/loading.service";
import {Router} from "@angular/router";
import {HabilitarTRDTO} from "../../../../core/dtos/habilitar-tr.dto";
import {TrService} from "../../../../core/services/tr.service";
import {LoginService} from "../../../../core/services/login.service";
import {AuthService} from "../../../../core/services/auth/auth.service";

@Component({
   selector: 'pnip-tr-solicitar-acesso',
   templateUrl: './solicitar-acesso.component.html',
   styleUrls: []
})
export class SolicitarAcessoComponent implements OnInit {

   public breadcrumb = [
      {
         label: 'Home',
         url: '/portal-tr',
         home: true
      },
      {
         label: 'Primeiro acesso',
         url: '/portal-tr/primeiro-acesso'
      },
      {
         label: 'Solicitar Habilitação de Técnico Responsável',
         active: true
      }
   ];

   constructor(private trService: TrService, private loadingService: LoadingService, private router: Router,
               private loginService: LoginService, private auth: AuthService) {}

   ngOnInit(): void {
      if (this.auth.usuarioLogado()) {
         this.router.navigate(['/portal-tr/primeiro-acesso/minhas-solicitacoes'], {queryParams: {message: 'true'}});
      }
   }

   salvar(dto: HabilitarTRDTO) {
      this.loadingService.show = true;
      this.trService.solicitarHabilitacao(dto).subscribe(
         (response) => {
            //this.router.navigate(['/portal-tr/primeiro-acesso/minhas-solicitacoes'], {queryParams: {message: 'true'}});
            this.loadingService.show = false;
            if (!this.auth.usuarioLogado()) {
               this.loginService.login();
            }
         },
         (error) => {
            console.error(error);
            this.loadingService.show = false;
         }
      );
   }

}
