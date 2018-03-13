import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-templates',
    templateUrl: './templates.component.html',
    styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

    constructor(private router: Router,
                private apiService: ApiService) {
    }

    ngOnInit() {
        // if (!localStorage.getItem('user')) {
        //     this.router.navigate(['/login']);
        //     console.log('aa');
        // } else {
        //     console.log('bb');
        //     const oldUser = localStorage.getItem('user');
        //     this.apiService.refreshToken(oldUser)
        //         .subscribe(
        //             (newToken: any) => {
        //                 console.log('newToke', newToken);
        //                 localStorage.setItem('currentUser', newToken.token);
        //             }, (error) => {
        //                 this.router.navigate(['/login']);
        //             });
        // }
    }

}
