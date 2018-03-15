import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Message } from 'primeng/api';
import * as _ from 'lodash';
import { ApiService } from '../../../api.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @ViewChild('editcontent') editcontent: ElementRef;

  cities1: any[] = [];
  dropTitle = [];
  UpdateField: any[] = [];
  selectedFieldList = [];
  list = [];
  msgs: Message[] = [];
  modal: NgbModalRef;
  input: any;
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
              private apiService: ApiService) {
  }

  ngOnInit() {
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
    this.documentType = _.get(this.UpdateDetail, 'type_name');
    this.documentDetail = _.get(this.UpdateDetail, 'detail');
    this.selectedFieldList = _.get(this.UpdateDetail, 'field');
    this.apiService.getField()
        .subscribe(
            (res: any) => {
              this.UpdateField = this.checkDuplicateInvoice(res);
            }
        );
    this.fieldValue = this.selectedFieldList;
  }

  checkDuplicateInvoice(invoices) {
    if (_.isEmpty(this.selectedFieldList)) {
      return invoices;
    } else {
      const filteredInvoices = _.differenceBy(invoices, this.selectedFieldList, 'field_name');
      return filteredInvoices;
    }
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


  open(editcontent) {
    this.showFirst = true;
    this.showSecond = false;
    this.modal = this.modalService.open(this.editcontent, {size: 'lg', windowClass: 'set-while-space'});
    this.loadField();
  }

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
              this.UpdateField = this.checkDuplicateInvoice(data);
              this.FieldLength = this.UpdateField.length;
            }
        );
  }

  updateData() {
    const data = {
      type_name: this.documentType,
      detail: this.documentDetail,
      field: this.selectedFieldList,
    };
    this.apiService.putField(this.UpdateDetail.id, data)
        .subscribe(
            (res: any) => {
              this.modal.close(this.editcontent);
              this.reset();
              this.apiService.getTable()
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
