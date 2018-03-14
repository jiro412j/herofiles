import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.scss']
})
export class UserSettingComponent implements OnInit {

  first = true;
  second = false;
  third = false;

  constructor() {
  }

  ngOnInit() {
  }

  permission() {
    this.first = true;
    this.second = false;
    this.third = false;

  }

  groups() {
    this.second = true;
    this.first = false;
    this.third = false;
  }

  user() {
    this.third = true;
    this.first = false;
    this.second = false;
  }

  permissionsetting() {

  }

}
