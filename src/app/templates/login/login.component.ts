import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  showError = false;
  msgs: Message[] = [];

  constructor(private router: Router,
              private apiService: ApiService) {
  }

  ngOnInit() {
    localStorage.clear();
  }

  login() {
    this.showError = false;
    this.apiService.login(this.username, this.password)
        .subscribe(
            (data: any) => {
              localStorage.setItem('user', data.token);
              this.router.navigate(['/homepage']);
            },
            (error) => {
              this.showError = true;
              this.msgs = [];
              this.msgs.push({severity: 'info', summary: 'Error:', detail: 'Wrong Username or Password'});
              this.router.navigate(['/login']);
            }
        );
  }

}