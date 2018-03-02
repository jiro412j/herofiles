import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TemplatesRoutingModule } from './templates-routing.module';
import {TemplatesComponent} from './templates.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {RouterModule} from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import {BrowserModule} from '@angular/platform-browser';
import {HomepageModule} from './homepage/homepage.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HomepageModule,
    BrowserAnimationsModule,
    RouterModule,
    TemplatesRoutingModule,
  ],
  declarations: [
    TemplatesComponent,
    NavBarComponent,
    SidebarComponent,
  ]
})
export class TemplatesModule { }
