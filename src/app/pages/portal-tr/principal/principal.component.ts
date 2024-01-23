import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../core/services/auth/auth.service";
import {TrService} from "../../../core/services/tr.service";
import {LoadingService} from "../../../core/services/loading.service";
import {ResponseDTO} from "../../../core/dtos/response.dto";

@Component({
   selector: 'pnip-tr-principal',
   templateUrl: `principal.component.html`,
   styleUrls: []
})
export class PrincipalComponent implements OnInit {

   public breadcrumb = [
      {
         label: 'Home',
         url: '/portal-tr',
         home: true
      },
      {
         label: 'Principal',
         active: true
      }
   ];

   public menuItems = [
      {
         label: 'EMBARCAÇÕES',
         icon: 'ship',
         url: '/embarcacoes'
      }
   ];

   constructor(private trService: TrService, private loadingService: LoadingService, private auth: AuthService,
               private router: Router) {}

   ngOnInit() {
      if (this.auth.usuarioLogado()) {
         this.loadingService.show = true;
         this.trService.findStatusUltimaSolicitacao().subscribe((response: ResponseDTO<string>) => {
            if (response) {
               if (response && response.msg !== 'DEFERIDA') {
                  this.router.navigate(['/portal-tr/primeiro-acesso']);
               }
               this.loadingService.show = false;
            }
         });
      } else {
         this.router.navigate(['/portal-tr/primeiro-acesso']);
      }
   }

}
