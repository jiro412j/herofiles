import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TemplatesRoutingModule } from './templates-routing.module';
import { TemplatesComponent } from './templates.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { HomepageModule } from './homepage/homepage.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserSettingModule } from './user-setting/user-setting.module';
import { DocumentModule } from './document/document.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    TemplatesRoutingModule,
    HomepageModule,
    UserSettingModule,
    DocumentModule
  ],
  declarations: [
    TemplatesComponent,
    NavBarComponent,
    SidebarComponent,
    LoginComponent
  ]
})
export class TemplatesModule {
}
