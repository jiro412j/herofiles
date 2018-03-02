import {ModuleWithProviders, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TemplatesComponent} from './templates/templates.component';
import {routes} from './templates/templates-routing.module';


const appRoutes: Routes = [
    //   path: '',
    //   component: TemplatesComponent,
    //   children: [
    //     ...routes
    //   ]
    // },
    ...routes
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

