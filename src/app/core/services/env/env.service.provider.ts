import { EnvService } from './env.service';

export const EnvServiceFactory = () => {
   // Create env
   const env:EnvService = new EnvService();

   // Read environment variables from browser window
   const browserWindow: any = window || {};
   const browserWindowEnv = browserWindow['__env'] || {};

   for (const key in browserWindowEnv) {
      if (browserWindowEnv.hasOwnProperty(key)) {
         // @ts-ignore
         env[key] = browserWindowEnv[key];
      }
   }
   return env;
};

export const EnvServiceProvider = {
   provide: EnvService,
   useFactory: EnvServiceFactory,
   deps: [],
};
