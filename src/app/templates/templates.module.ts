import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TemplatesRoutingModule } from './templates-routing.module';
import { TemplatesComponent } from './templates.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { HomepageModule } from './homepage/homepage.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserSettingModule } from './user-setting/user-setting.module';
import { LoginModule } from './login/login.module';
import { DocumentModule } from './document/document.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HomepageModule,
    FormsModule,
    UserSettingModule,
    LoginModule,
    BrowserAnimationsModule,
    RouterModule,
    TemplatesRoutingModule,
    DocumentModule
  ],
  declarations: [
    TemplatesComponent,
    NavBarComponent,
    SidebarComponent,
  ]
})
export class TemplatesModule {
}
