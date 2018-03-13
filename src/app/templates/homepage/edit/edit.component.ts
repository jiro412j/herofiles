import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Message} from 'primeng/api';
import {HttpClient} from '@angular/common/http';
import * as _ from 'lodash';
import {AppService} from '../../../app.service';
import {ApiService} from '../../../api.service';


@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
    @ViewChild('content') public content: ElementRef;

    cities1: any[] = [];
    selectedCity1 = [];
    dropTitle = [];
    Field: any[] = [];
    UpdateField: any[] = [];
    selectedFieldList = [];
    list = [];
    msgs: Message[] = [];
    totalItems: number;
    modal: NgbModalRef;
    input: any;
    currentPage: number;
    dataTable: any;
    documentType: any;
    documentDetail: any;
    companyInitial: any;
    fieldValue: any[] = [];
    companyNew: any;
    fieldName: any;
    fieldCondition: any;
    title: any;
    req: any;
    fieldValueBack: any;
    FieldLength: any;
    public data: any[];

    showSecond = false;
    showFirst = true;
    showThird = false;
    documentList = true;
    companyList = false;
    addtable = false;
    hideCheckbox = false;


    @Input() UpdateDetail: any;
    @Output() posted = new EventEmitter();

    constructor(private modalService: NgbModal,
                private appService: ApiService) {
    }

    ngOnInit() {
        this.loadInput();
        this.cities1 = [
            {
                label: 'Select Condition',
                value: ''
            },
            {
                label: 'Text',
                value: '0'
            },
            {
                label: 'Number',
                value: '1'
            },
            {
                label: 'Date',
                value: '2'
            }
        ];
        this.documentType = _.get(this.UpdateDetail, 'type_name', undefined);
        this.documentDetail = _.get(this.UpdateDetail, 'detail', undefined);
        this.selectedFieldList = _.get(this.UpdateDetail, 'field', undefined);
        console.log('this.selectedFIle', this.selectedFieldList);
        this.appService.getField()
            .subscribe(
                (res: any) => {
                    this.UpdateField = this.checkDuplicateInvoice(res);
                    console.log('Field', this.UpdateField);
                }
            );
        this.fieldValue = this.selectedFieldList;
    }

    checkDuplicateInvoice(invoices) {
        if (_.isEmpty(this.selectedFieldList)) {
            return invoices;
        } else {
            const filteredInvoices = _.differenceBy(invoices, this.selectedFieldList, 'field_name');
            console.log('invoices', invoices);
            console.log('this.selectedFieldList', this.selectedFieldList);
            console.log('filteredInvoices', filteredInvoices);
            return filteredInvoices;
        }
    }

    deleteField(index) {
        this.appService.deleteFields(index.id)
            .subscribe(
                (res: any) => {
                    this.loadField();
                }
            );
    }

    moveTo(event) {
        // this.hideCheckbox = true;
        const selectedField = _.filter(this.UpdateField, {id: event.id});
        this.selectedFieldList.push(selectedField[0]);

        this.UpdateField = _.filter(this.UpdateField, (obj: any) => {
            return obj.id !== event.id;
        });
    }

    moveBack(event) {
        const selectedFieldBack = _.filter(this.selectedFieldList, {id: event.id});
        this.UpdateField.push(selectedFieldBack[0]);

        this.selectedFieldList = _.filter(this.selectedFieldList, (obj) => {
            return obj.id !== event.id;
        });
    }

    loadInput() {
        this.appService.getTable()
            .subscribe(
                (response: any) => {
                    this.totalItems = response.length;
                }
            );
        this.appService.getTable()
            .subscribe(
                (response: any) => {
                    this.data = response;
                }
            );
        // this.http.get('http://localhost:3000/templates?_field')
        //     .subscribe(
        //         (res: any) => {
        //             this.FieldLength = res.length;
        //             console.log('this', res);
        //         }
        //     );
    }

    open(content) {
        this.modal = this.modalService.open(this.content, {size: 'lg', windowClass: 'set-while-space'});
        this.loadField();
    }

    pageChanged(event: any) {
        // this.page = 1;
        this.currentPage = event.page;
        console.log('t', this.currentPage);
        this.appService.getTable()
            .subscribe(
                (response: any) => {
                    this.data = response;
                }
            );
        // this.appService.get('http://localhost:3000/templates?_sort=' + this.selectedCity1 + '&_order=asc' + '&_page=' + this.currentPage)
        //     .subscribe(
        //         (response: any) => {
        //             this.data = response;
        //         }
        //     );
    }

    search() {
        // this.http.get('http://localhost:3000/templates')
        //   .subscribe(
        //     (response: any) => {
        //       this.totalItems = response.length;
        //     }
        //   );
        // this.appService.get('http://localhost:3000/templates?_page=' + this.currentPage + '&q=' + this.input)
        //     .subscribe(
        //         (response: any) => {
        //             this.data = response;
        //             this.appService.get('http://localhost:3000/templates?q=' + this.input)
        //                 .subscribe(
        //                     (a: any) => {
        //                         this.totalItems = a.length;
        //                     }
        //                 );
        //             console.log('search', response);
        //         }
        //     );
    }

    // openModal(lgModal: TemplateRef<any>) {
    //   this.modalRef = this.modalService.show(lgModal);
    // }

    showSecondModel() {
        this.showSecond = true;
        this.showFirst = false;
        this.showThird = false;
    }

    showFirstModel() {
        this.showSecond = false;
        this.showFirst = true;
        this.showThird = false;
    }

    showThirdModel() {
        this.showThird = true;
        this.showSecond = false;
        this.showFirst = false;
    }

    postTable() {
        const projectTitle = {
            // title: this.title,
            field_name: this.fieldName,
            condition: this.fieldCondition,
            key: this.req
        };

        this.appService.getField()
            .subscribe(
                (res: any) => {
                    if (_.isEmpty(_.filter(res, {field_name: this.fieldName}))) {
                        this.appService.postField( projectTitle)
                            .subscribe(
                                (data: any) => {
                                    this.loadField();
                                }
                            );
                    } else {
                        this.msgs = [];
                        this.msgs.push({severity: 'error', summary: 'Error Message', detail: 'Duplicated Field Name'});
                    }
                }
            );
    }

    loadField() {
        this.appService.getField()
            .subscribe(
                (data: any) => {
                    this.UpdateField = this.checkDuplicateInvoice(data);
                    console.log('data', data);
                    this.FieldLength = this.UpdateField.length;
                    console.log('this.a', this.FieldLength);
                }
            );
    }

    updateData() {
        const data = {
            type_name: this.documentType,
            detail: this.documentDetail,
            field: this.selectedFieldList,
        };
        this.appService.putField( this.UpdateDetail.id, data)
            .subscribe(
                (res: any) => {
                    this.modal.close();
                    this.reset();
                    this.appService.getTable()
                        .subscribe(
                            (response: any) => {
                                this.posted.emit();
                            }
                        );
                }
            );
    }

    reset() {
        this.documentType = '';
        this.documentDetail = '';
        this.companyNew = '';
        this.companyInitial = '';
        this.dropTitle = [];
        this.dataTable = '';
    }
}
