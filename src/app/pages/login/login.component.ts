import {AfterViewInit, Component} from '@angular/core';
import {LoginService} from "../../core/services/login.service";

@Component({
   selector: 'pnip-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit{

   public breadcrumb = [
      {
         label: 'Página Inicial',
         url: '/',
         home: true
      },
      {
         label: 'Plataforma Nacional da Indústria do Pescado',
         active: true
      }
   ];

   constructor(private loginService: LoginService) {

   }

   login() {
      this.loginService.login();
   }


   ngAfterViewInit(): void {
      this.loginService.isLogin();
   }

}
