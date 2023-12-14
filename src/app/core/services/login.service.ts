import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {LoadingService} from "./loading.service";
import {AuthService} from "./auth/auth.service";

@Injectable({
   providedIn: 'root'
})
export class LoginService {

   private username: string | null = null;
   private role: string | null = null;
   private primeiroAcesso = false;

   constructor(private loadingService: LoadingService, private authService?: AuthService, private router?: Router) {
   }

   public isLogin() {
      if(this.authService?.usuarioLogado()){
         this.loadingService.show = true;
         setTimeout(() => {
            this.username = 'Joedeson Jr';
            this.role = 'tr';
            this.primeiroAcesso = true;
            this.router?.navigate([`/portal-${this.role}`]);
            setTimeout(() => this.loadingService.show = false, 200);
         }, 1000);
      }
   }
   public login(){
      this.authService?.login();
   }

   public getUsername() {
      return this.authService?.getName();
   }

   public init(){
      this.authService?.init();
   }

   public isPrimeiroAcesso() {
      return this.primeiroAcesso;
   }

}
