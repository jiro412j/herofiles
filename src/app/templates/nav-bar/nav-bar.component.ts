import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
    }

    logout() {
        this.apiService.logout();
    }

}
