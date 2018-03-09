import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HomepageComponent} from './homepage.component';
import {NgModule} from '@angular/core';
import {HotTableModule} from 'ng2-handsontable';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CheckboxModule, DataScrollerModule, DragDropModule, DropdownModule, RadioButtonModule} from 'primeng/primeng';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {FormsModule} from '@angular/forms';
import {ModalModule, TabsModule} from 'ngx-bootstrap';
import {CardModule} from 'primeng/card';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HotTableModule,
        DropdownModule,
        FormsModule,
        RadioButtonModule,
        DragDropModule,
        DataScrollerModule,
        CardModule,
        CheckboxModule,
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        TabsModule.forRoot(),
        NgbModule
    ],
    declarations: [
        HomepageComponent
    ],
    providers: []
})
export class HomepageModule {
}
