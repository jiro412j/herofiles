import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {TemplatesComponent} from './templates.component';
import {homepageRoutes} from './homepage/homepage.routes';
import {userroutes} from './user-setting/user-setting-routing.module';
import {LoginComponent} from './login/login.component';
import { AuthGuard } from '../auth-guard.service';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '',
        component: TemplatesComponent,
        children: [
            ...homepageRoutes,
            ...userroutes
        ],
      canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TemplatesRoutingModule {
}
