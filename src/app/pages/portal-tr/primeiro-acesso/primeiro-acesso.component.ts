import {Component, OnInit} from '@angular/core';
import {TrService} from "../../../core/services/tr.service";
import {LoadingService} from "../../../core/services/loading.service";
import {ResponseDTO} from "../../../core/dtos/response.dto";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/services/auth/auth.service";

@Component({
   selector: 'pnip-tr-primeiro-acesso',
   template: '',
   styleUrls: []
})
export class PrimeiroAcessoComponent implements OnInit {

   public breadcrumb = [
      {
         label: 'Home',
         url: '/portal-tr',
         home: true
      },
      {
         label: 'Primeiro acesso',
         active: true
      }
   ];

   public menuItems = [
      {
         label: 'SOLICITAR HABILITAÇÃO',
         icon: 'ship',
         url: '/solicitar'
      },
      {
         label: 'MINHAS SOLICITAÇÕES',
         icon: 'list',
         url: '/minhas-solicitacoes'
      },
   ];

   constructor(private trService: TrService, private loadingService: LoadingService, private router: Router, private auth: AuthService) {}

   ngOnInit() {
      if (this.auth.usuarioLogado()) {
         this.loadingService.show = true;
         this.trService.findStatusUltimaSolicitacao().subscribe((response: ResponseDTO<string>) => {
            if (response) {
               this.redirecionarPorStatus(response.msg);
               this.loadingService.show = false;
            }
         });
      }
   }

   private redirecionarPorStatus(status: string | null) {
      const url = `/portal-tr/primeiro-acesso/${(status === null ? 'solicitar' : 'minhas-solicitacoes')}`;
      this.router.navigate([url]);
   }

}
