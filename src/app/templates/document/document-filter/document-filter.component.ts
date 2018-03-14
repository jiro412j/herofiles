import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-document-filter',
  templateUrl: './document-filter.component.html',
  styleUrls: ['./document-filter.component.scss']
})
export class DocumentFilterComponent implements OnInit {

  startDate: NgbDateStruct;
  endDate: NgbDateStruct;

  constructor() { }

  ngOnInit() {
  }

}
