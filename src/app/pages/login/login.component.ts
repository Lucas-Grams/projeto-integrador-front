import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../core/services/login.service";

import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
   selector: 'pnip-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   public formGroup!: FormGroup;
   public identificacao?: string;
   public senha?: string;

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

   constructor(private fb: FormBuilder, private loginService: LoginService) {

   }

   ngOnInit() {
      this.formGroup = this.fb.group({
         identificacao: [this.identificacao, [Validators.required]],
         senha: [this.senha, [Validators.required]],
      });

      this.loginService.isLogin();
      this.id = setInterval(() => {
         this.loginService.isLogin();
      }, 300);
   }

   login() {
      this.loginService.login();
   }

   ngOnDestroy() {
      if (this.id) {
         clearInterval(this.id);
      }
   }

   submit() {
      if (this.formGroup.valid) {
         console.log(this.formGroup.value);
      } else {
         this.formGroup.markAllAsTouched();
      }
   }
}
