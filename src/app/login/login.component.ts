import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    username: string;
    password: string;
    constructor(public router: Router) {
    }

    ngOnInit() {
        this.username = "";
        this.password = ""
    }
    
    /**
     * This function sets the appropriate cookies
     */
    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
        // Simple authorization for admin
        if (this.username == 'admin' && this.password == 'admin' ){
            localStorage.setItem('adminView', 'true');
        }
    }
}
