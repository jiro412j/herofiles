import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DATA} from '../../shared/mock.data';
import {SelectItem} from 'primeng/api';
import {HttpClient} from '@angular/common/http';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import * as _ from 'lodash';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';


interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

    @ViewChild('content') public content: ElementRef;

    cities1: any[] = [];
    selectedCity1 = [];
    dropTitle = [];
    Field: any[] = [];
    dropField: any[] = [];
    draggedField: any;
    selectedTitle: any[] = [];
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

    showSecond = false;
    showFirst = true;
    showThird = false;
    documentList = true;
    companyList = false;
    addtable = false;

    public data: any[];
    public colHeaders: string[] = ['Number', 'Document Field', 'Condition', 'Created By',
        'Edit'];
    public columns: any[] = [
        {
            data: 'id',
            className: 'htMiddle',
        },
        {
            data: 'Company_Name',
            renderer: 'text',
            className: 'htMiddle',
            readOnly: true
        },
        {
            data: 'Company_Nickname',
            className: 'htMiddle',
            readOnly: true
        },
        {
            data: 'Create_By',
            className: 'htMiddle',
        },
        {
            data: 'Edit',
            renderer: this.renderButtons,
            source: 'product.options',
            optionField: 'description',
            type: 'autocomplete',
            strict: false,
            visibleRows: 4
        }
    ];

    public colHeader: string[] = ['Number', 'Document Type', 'Document Description', 'Created By',
        'Edit', this.dataTable];
    public column: any[] = [
        {
            data: 'id',
            className: 'htMiddle',
        },
        {
            data: 'Document_New',
            renderer: 'text',
            className: 'htMiddle',
            readOnly: true
        },
        {
            data: 'Document_Detail',
            className: 'htMiddle',
            readOnly: true
        },
        {
            data: 'Create_By',
            className: 'htMiddle',
        },
        {
            data: 'Edit',
            renderer: this.renderButtons,
            source: 'product.options',
            optionField: 'description',
            type: 'autocomplete',
            strict: false,
            visibleRows: 4
        }
    ];

    private colWidths: number[] = [10, 20, 20, 20, 10];
    private options: any = {
        stretchH: 'all',
        columnSorting: true,
        contextMenu: [
            'row_above', 'row_below', 'remove_row'
        ]
    };

    constructor(private http: HttpClient,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.loadInput();
        this.cities1 = [
            {
                label: 'Text',
                value: 'text'
            },
            {
                label: 'Number',
                value: 'number'
            },
            {
                label: 'Date',
                value: 'date'
            }
        ];
    }

    test(){
        console.info('field', this.fieldValue);
    }

    loadInput() {
        this.http.get('http://localhost:3000/templates')
            .subscribe(
                (response: any) => {
                    this.totalItems = response.length;
                }
            );
        this.http.get('http://localhost:3000/templates?_page=' + this.currentPage)
            .subscribe(
                (response: any) => {
                    this.data = response;
                }
            );
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
        this.http.get('http://localhost:3000/templates?_page=' + this.currentPage)
            .subscribe(
                (response: any) => {
                    this.data = response;
                }
            );
        this.http.get('http://localhost:3000/templates?_sort=' + this.selectedCity1 + '&_order=asc' + '&_page=' + this.currentPage)
            .subscribe(
                (response: any) => {
                    this.data = response;
                }
            );
    }

    search() {
        // this.http.get('http://localhost:3000/templates')
        //   .subscribe(
        //     (response: any) => {
        //       this.totalItems = response.length;
        //     }
        //   );
        this.http.get('http://localhost:3000/templates?_page=' + this.currentPage + '&q=' + this.input)
            .subscribe(
                (response: any) => {
                    this.data = response;
                    this.http.get('http://localhost:3000/templates?q=' + this.input)
                        .subscribe(
                            (a: any) => {
                                this.totalItems = a.length;
                            }
                        );
                    console.log('search', response);
                }
            );
    }

    // openModal(lgModal: TemplateRef<any>) {
    //   this.modalRef = this.modalService.show(lgModal);
    // }

    showSecondModel() {
        this.showSecond = true;
        this.showFirst = false;
        this.showThird = false;
        this.loadTable();
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
            name: this.fieldName,
            condition: this.fieldCondition,
            key: this.req
        };
        this.http.post('http://localhost:3000/field', projectTitle)
            .subscribe(
                (res: any) => {
                    this.loadField();
                }
            );
    }

    dragStart(event, field) {
        this.draggedField = field;
        console.log('drag', this.draggedField);
    }

    dragEnd(event) {
        this.draggedField = null;
    }

    drop(event, index) {
        // this.http.get('http://localhost:3000/field?id=' + index)
        //     .subscribe(
        //         (res: any) => {
        //             this.dropField = res;
        //             console.log('drop', this.dropField);
        //         }
        //     );
        this.dropField.push(this.draggedField);
        console.log('dropField', this.dropField);
    }

    loadTable() {
        this.http.get('http://localhost:3000/table')
            .subscribe(
                (res: any) => {
                    this.dataTable = res;
                    console.log('kim', res[0].data);
                    _.forEach(res[0].data, (item) => {
                        console.log('load', item);
                        this.dropTitle.push({label: item.label, value: item.value});
                        console.log('loadttile', this.dropTitle);
                    });
                }
            );
    }

    loadField() {
        this.http.get('http://localhost:3000/field')
                        .subscribe(
                            (data: any) => {
                                this.Field = data;
                            }
                        );
    }

    addTable(index) {
        this.addtable = true;
        this.http.get('http://localhost:3000/table/' + index)
            .subscribe(
                (res: any) => {
                    this.dropTitle.push({label: res.label, value: res.value});
                    // this.dropAdd = Object.assign({}, object1);
                    console.log('res', res);
                }
            );
    }

    removeTable(index) {
        const array = this.dataTable.indexOf(index);
        this.dataTable.splice(array, 1);
        // this.http.delete('http://localhost:3000/table/' + index)
        //   .subscribe(
        //     (res: any) => {
        //       console.log('res', res);
        this.loadTable();
        // }
        // );
    }

    saveData() {
        const data = {
            Document_New: this.documentType,
            Document_Detail: this.documentDetail,
            Company_Name: this.companyNew,
            Company_Nickname: this.companyInitial,
            table: this.dropTitle
        };
        this.http.post('http://localhost:3000/templates', data)
            .subscribe(
                (res: any) => {
                    this.modal.close();
                    this.reset();
                    this.http.get('http://localhost:3000/templates')
                        .subscribe(
                            (response: any) => {
                                this.totalItems = response.length;
                                _.forEach(response.table, (item) => {
                                    this.title.push(item.id);
                                    console.log('daf', this.title);
                                });
                            }
                        );
                    this.http.get('http://localhost:3000/templates?_page=' + this.currentPage)
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
