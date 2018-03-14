import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DATA} from '../../shared/mock.data';
import {Message, SelectItem} from 'primeng/api';
import {HttpClient} from '@angular/common/http';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import * as _ from 'lodash';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {MessageService} from 'primeng/components/common/messageservice';
import {ApiService} from '../../api.service';
import {AppService} from '../../app.service';


interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
    providers: [MessageService]
})
export class HomepageComponent implements OnInit {

    @ViewChild('content') public content: ElementRef;

    cities1: any[] = [];
    selectedCity1 = [];
    dropTitle = [];
    Field: any[] = [];
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
    fieldValue: any;
    companyNew: any;
    fieldName: any;
    fieldCondition: any;
    title: any;
    req: any;
    fieldValueBack: any;
    FieldLength: any;

    showSecond = false;
    showFirst = true;
    showThird = false;
    documentList = true;
    companyList = false;
    addtable = false;
    hideCheckbox = false;

    public data: any[];

    constructor(private appService: ApiService,
                private modalService: NgbModal,
                 ) {
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
        this.loadField();
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
        const selectedField = _.filter(this.Field, {id: event.id});
        this.selectedFieldList.push(selectedField[0]);

        this.Field = _.filter(this.Field, (obj: any) => {
            return obj.id !== event.id;
        });
    }

    moveBack(event) {
        const selectedFieldBack = _.filter(this.selectedFieldList, {id: event.id});
        this.Field.push(selectedFieldBack[0]);

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

    renderButtons(instance, td, row, col, prop, value, cellProperties) {
        td.innerHTML = '<a href="google.com"><img src=\"../../../assets/images/edit.png\"></a>';
        td.style.textAlign = 'center';
    }

    // postSort(index) {
    //   console.log('select', this.selectedCity1[index]);
    //   this.http.get('http://localhost:3000/templates')
    //     .subscribe(
    //       (response: any) => {
    //         this.totalItems = response.length;
    //       }
    //     );
    //   this.http.get('http://localhost:3000/templates?_sort=' + this.selectedCity1[index] + '&_order=desc' + '&_page=' + this.currentPage)
    //     .subscribe(
    //       (response: any) => {
    //         this.data = response;
    //       }
    //     );
    // }

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
        // this.http.get('http://localhost:3000/templates?_sort=' + this.selectedCity1 + '&_order=asc' + '&_page=' + this.currentPage)
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
        // this.appService.get('http://192.168.100.235:8000/api/document_setting/' + this.currentPage + '&q=' + this.input)
        //     .subscribe(
        //         (response: any) => {
        //             this.data = response;
        //             this.http.get('http://localhost:3000/templates?q=' + this.input)
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
        // this.loadTable();
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

    // loadTable() {
    //     this.appService.get('http://localhost:3000/table')
    //         .subscribe(
    //             (res: any) => {
    //                 this.dataTable = res;
    //                 console.log('kim', res[0].data);
    //                 _.forEach(res[0].data, (item) => {
    //                     console.log('load', item);
    //                     this.dropTitle.push({label: item.label, value: item.value});
    //                     console.log('loadttile', this.dropTitle);
    //                 });
    //             }
    //         );
    // }

    loadField() {
        this.appService.getField()
                        .subscribe(
                            (data: any) => {
                                this.Field = data;
                                this.FieldLength = data.length;
                                console.log('this.a', this.FieldLength);
                            }
                        );
    }

    addTable(index) {
        // this.addtable = true;
        // this.appService.get('http://localhost:3000/table/' + index)
        //     .subscribe(
        //         (res: any) => {
        //             this.dropTitle.push({label: res.label, value: res.value});
        //             // this.dropAdd = Object.assign({}, object1);
        //             console.log('res', res);
        //         }
        //     );
    }

    removeTable(index) {
        // const array = this.dataTable.indexOf(index);
        // this.dataTable.splice(array, 1);
        // // this.http.delete('http://localhost:3000/table/' + index)
        // //   .subscribe(
        // //     (res: any) => {
        // //       console.log('res', res);
        // this.loadTable();
        // }
        // );
    }

    saveData() {
        const data = {
            type_name: this.documentType,
            detail: this.documentDetail,
            field: this.selectedFieldList,
        };
        this.appService.postTable(data)
            .subscribe(
                (res: any) => {
                    this.modal.close();
                    this.reset();
                    this.appService.getTable()
                        .subscribe(
                            (response: any) => {
                                this.totalItems = response.length;
                                _.forEach(response.table, (item) => {
                                    this.title.push(item.id);
                                    console.log('daf', this.title);
                                });
                            }
                        );
                    this.appService.getTable()
                        .subscribe(
                            (response: any) => {
                                this.data = response;
                            }
                        );
                }
            );
    }

    doc() {
        this.documentList = true;
        this.companyList = false;
        console.log('asdfasf');
    }

    company() {
        this.companyList = true;
        this.documentList = false;
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
