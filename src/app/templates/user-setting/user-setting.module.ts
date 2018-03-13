import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {UserSettingComponent} from './user-setting.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        TabsModule.forRoot(),
        NgbModule

    ],
    declarations: [
        UserSettingComponent
    ]
})
export class UserSettingModule {
}
