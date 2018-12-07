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
        // this.username = "";
        // this.password = "";
    }

    ngOnInit() {
        this.username = "";
        this.password = ""
    }
    // Old onLoggedin function
    // onLoggedin() {
    //     localStorage.setItem('isLoggedin', 'true');
    // }
    onLoggedin() {
        // Need to add authorization logic
        localStorage.setItem('isLoggedin', 'true');
        if (this.username == 'admin' && this.password == 'admin' ){
            localStorage.setItem('adminView', 'true');
        }
    }
    onSubmit(){
        // console.log('Username: ' + this.username);
        // console.log('Password: ' + this.password);
        // if (this.username == '' && this.password == '' ){
        //     localStorage.setItem('userView', 'true');
        // }
        // if (this.username == 'admin' && this.password == 'admin' ){
        //     localStorage.setItem('adminView', 'true');
        // }
        // console.log('Username: ' + f.value.username);
        // console.log('Password: ' + f.value.password);

    }
}
