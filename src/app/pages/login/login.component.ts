import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../core/services/login.service";

@Component({
   selector: 'pnip-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

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
   private id: any;

   constructor(private loginService: LoginService) {

   }

   login() {
      this.loginService.login();
   }
   
   ngOnInit() {
      this.loginService.isLogin();
      this.id = setInterval(() => {
         this.loginService.isLogin();
      }, 300);
   }

   ngOnDestroy() {
      if (this.id) {
         clearInterval(this.id);
      }
   }
}
