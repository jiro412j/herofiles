import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { HttpParams } from '@angular/common/http';
import * as _ from 'lodash';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/components/common/messageservice';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  providers: [MessageService]
})
export class HomepageComponent implements OnInit {

  @ViewChild('content') public content: ElementRef;

  cities1: any[] = [];
  Field: any[] = [];
  selectedFieldList = [];
  list = [];
  msgs: Message[] = [];
  totalItems: number;
  modal: NgbModalRef;
  input: any;
  currentPage = 1;
  documentType: any;
  documentDetail: any;
  fieldValue: any;
  fieldName: any;
  fieldCondition: any;
  title: any;
  req: any;
  FieldLength: any;

  showSecond = false;
  showFirst = true;
  showThird = false;
  documentList = true;
  companyList = false;

  public data: any[];

  constructor(private apiService: ApiService,
              private modalService: NgbModal,) {
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
    this.apiService.deleteFields(index.id)
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
    this.apiService.getTable()
        .subscribe(
            (response: any) => {
              this.totalItems = response.count;
              console.log('total', this.totalItems);
            }
        );
    this.apiService.getTable()
        .subscribe(
            (response: any) => {
              this.data = response.results;
              console.log('data', this.data);
            }
        );
  }

  open(content) {
    this.showFirst = true;
    this.showSecond = false;
    this.modal = this.modalService.open(this.content, {size: 'lg', windowClass: 'set-while-space'});
    this.loadField();
  }

  pageChanged() {
    const params = new HttpParams().set('page', _.toString(this.currentPage));
    console.log('page', params);
    this.apiService.getTable(params)
        .subscribe(
            (response: any) => {
              this.data = response.results;
              console.log('page', this.data);
            }
        );
  }

  search() {
    const params = new HttpParams().set('search', this.input);
    console.log('par', params);
    this.apiService.getTable(params)
        .subscribe(
            (response: any) => {
              this.data = response.results;
              console.log('search', this.data);
            }
        );
  }

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

    this.apiService.getField()
        .subscribe(
            (res: any) => {
              if (_.isEmpty(_.filter(res, {field_name: this.fieldName}))) {
                this.apiService.postField(projectTitle)
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
    this.apiService.getField()
        .subscribe(
            (data: any) => {
              this.Field = this.checkDuplicateField(data);
              this.FieldLength = data.length;
              console.log('this.a', this.FieldLength);
            }
        );
  }

  checkDuplicateField(field) {
    if (_.isEmpty(this.selectedFieldList)) {
      return field;
    } else {
      const filteredField = _.differenceBy(field, this.selectedFieldList, 'id');
      return filteredField;
    }
  }

  saveData() {
    const data = {
      type_name: this.documentType,
      detail: this.documentDetail,
      field: this.selectedFieldList,
    };
    this.apiService.postTable(data)
        .subscribe(
            (res: any) => {
              this.modal.close();
              this.reset();
              this.apiService.getTable()
                  .subscribe(
                      (response: any) => {
                        this.totalItems = response.counts;
                        _.forEach(response.table, (item) => {
                          this.title.push(item.id);
                          console.log('daf', this.title);
                        });
                        this.data = response.results;
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

  reset() {
    this.documentType = '';
    this.documentDetail = '';
    this.selectedFieldList = [];
  }
}
