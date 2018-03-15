import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ApiService } from './api.service';
import { HttpClientService } from './shared/http-client.service';
import { AuthGuard } from './auth-guard.service';
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { TemplatesModule } from './templates/templates.module';

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
  providers: [
    HttpClientService,
    ApiService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
