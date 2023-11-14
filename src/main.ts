import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {PnipModule} from './app/pnip.module';


platformBrowserDynamic().bootstrapModule(PnipModule)
   .catch(err => console.error(err));
