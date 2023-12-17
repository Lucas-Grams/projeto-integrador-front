import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./layout/not-found/not-found.component";
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuard} from "./utils/guards/auth/auth.guard";

const routes: Routes = [
   {
      path: '',
      pathMatch: 'full',
      redirectTo: 'login',
   },
   {
      path: 'login',
      component: LoginComponent,
   },
   {
      path: 'portal-admin',
      loadChildren: () => import('./pages/portal-admin/admin.module').then((m) => m.AdminModule),
      canActivate: [AuthGuard],
   },
   {
      path: 'portal-mpa',
      loadChildren: () => import('./pages/portal-mpa/mpa.module').then((m) => m.MpaModule)
   },
   {
      path: 'portal-tr',
      loadChildren: () => import('./pages/portal-tr/tr.module').then((m) => m.TrModule)
   },
   {
      path: '**',
      component: NotFoundComponent,
   },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class PnipRoutingModule {}
