import {APP_INITIALIZER} from "@angular/core";
import {AuthService} from "./auth.service";


export const AuthServiceFactory = (auth: AuthService) => {
   return auth.init();
};

export const AuthServiceProvider = {
   provide: APP_INITIALIZER,
   useFactory: AuthServiceFactory,
   deps: [AuthService],
};
