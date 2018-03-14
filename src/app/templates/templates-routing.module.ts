import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {TemplatesComponent} from './templates.component';
import {homepageRoutes} from './homepage/homepage.routes';
import {userroutes} from './user-setting/user-setting-routing.module';
import {LoginComponent} from './login/login.component';

export const routes: Routes = [
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
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TemplatesRoutingModule {
}
