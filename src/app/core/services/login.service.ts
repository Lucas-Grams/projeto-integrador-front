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
      this.loadingService.show = true;
      this.authService?.asynccheckLogado().then(data => {
         if(data == true){
            this.username = '';
            this.role = this.checkRole(this.authService?.getRealmAccess());
            this.role = this.role == 'convidado' ? 'tr' : this.role;
            this.primeiroAcesso = this.authService?.isConvidado();
            this.router?.navigate([`/portal-${this.role}`]);
         }

         this.loadingService.show = false
      });
   }


   checkRole(roles:any[]){
      let temp= ['tr','admin','mpa','convidado'];

     for(let i =0; i < temp.length; i++){
        if(roles.includes(temp[i])){
           return temp[i];
        }
     }
     return '';
   }
   public login(){
      this.authService?.login();
   }

   public getUsername() {
      return this.authService?.getName();
   }

   public async init() {
      await this.authService?.init();
   }

   public isPrimeiroAcesso() {
      return this.primeiroAcesso;
   }



   logout() {
      this.authService?.logout();
   }
}
