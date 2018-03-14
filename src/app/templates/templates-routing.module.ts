import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { TemplatesComponent } from './templates.component';
import { homepageRoutes } from './homepage/homepage.routes';
import { userroutes } from './user-setting/user-setting-routing.module';
import { documentRoutes } from './document/document-routing.module';

export const routes: Routes = [
  {
    path: '',
    component: TemplatesComponent,
    children: [
      ...homepageRoutes,
      ...userroutes,
      ...documentRoutes
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule {
}
