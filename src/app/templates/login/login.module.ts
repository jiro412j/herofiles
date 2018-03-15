import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MessagesModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {MessageModule} from 'primeng/message';
import {GrowlModule} from 'primeng/growl';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MessagesModule,
        MessageModule,
        GrowlModule,
        NgbModule
    ],
    declarations: [
        LoginComponent,
    ],
    providers: []
})
export class LoginModule {
}
