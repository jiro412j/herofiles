import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {TemplatesModule} from './templates/templates.module';
import {RouterModule} from '@angular/router';
import { routing} from './app.routes';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {ApiService} from './api.service';
import {AppService} from './app.service';
import { AuthGuard } from './auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    TemplatesModule,
    HttpClientModule,
    RouterModule,
    NgbModule.forRoot(),
  ],
  providers: [AppService, ApiService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
