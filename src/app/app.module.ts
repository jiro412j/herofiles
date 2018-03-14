import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TemplatesModule } from './templates/templates.module';
import { RouterModule } from '@angular/router';
import { routing } from './app.routes';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { HttpClientService } from './shared/http-client.service';

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
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
