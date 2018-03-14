import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    username: string;
    password: string;
    errorValidation = false;
    isLoading = false;
    errorMsg = false;

    test = '123123';

    constructor(private router: Router,
                private apiService: ApiService) {
    }

    ngOnInit() {
    }

    login() {
        this.apiService.login(this.username, this.password)
            .subscribe(
                (data: any) => {
                    localStorage.setItem('user', data.token);
                    this.router.navigate(['/homepage']);
                },
                (error) => {
                    this.isLoading = false;
                    this.errorValidation = true;
                    this.errorMsg = false;
                    this.router.navigate(['/login']);
                }
            );
    }
}