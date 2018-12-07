import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
// Added File Upload support
import {  FileUploader, FileSelectDirective , ParsedResponseHeaders, FileItem } from 'ng2-file-upload';

//import the native angular http and respone libraries
import { ElementRef, Input } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
// POST to url
// const URL = 'http://localhost:3000/uploads/';
const URL = 'http://localhost:3000/files';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    pushRightClass: string = 'push-right';
    // File upload
    public uploader: FileUploader = new FileUploader({
        url: URL, itemAlias: 'photo',
    });
    /**
     * 
     * @param translate 
     * @param router 
     * @param http 
     * @param el 
     */
    constructor(private translate: TranslateService, public router: Router, private http: HttpClient, private el: ElementRef) {

        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }
    /**
     * 
     */
    ngOnInit() {
        this.uploader.onBuildItemForm = (item, form) => {
            // console.log('Building Form!!!!!');
            form.append('name', 'test');
        };
        this.uploader.onAfterAddingFile = (file) => {
            // console.log('Building Form!!!!!');
            file.withCredentials = false;
        };
        this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
        this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    }

     
     /**
      * This function handles the file upload for a csv file
      */
     upload() {
        //locate the file element meant for the file upload.
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#csv');
        //get the total amount of files attached to the file input.
        let fileCount: number = inputEl.files.length;
        //create a new fromdata instance
        let formData = new FormData();
        var headers = new HttpHeaders();
        headers.set('Content-Type', 'multipart/form-data');
        //check if the filecount is greater than zero, to be sure a file was selected.
        if (fileCount > 0) { // a file was selected
            //append the key name 'photo' with the first file in the element
            formData.append('csv', inputEl.files.item(0));
            // formData.append('json', data );
            //call the angular http method
            this.http
            //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
            .post(URL, formData).subscribe( response => {
                console.log(response);
                // if (response.statuscode)
            });
        }
        
    }



    // Adding CallBacks
    onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
        alert('File uploaded successfully!');
        let data = JSON.parse(response); //success server response
        console.log('Data: ' + data);
        
    }

    onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
        alert('File not uploaded!');
        let error = JSON.parse(response); //error server response
        console.log('Error: ' + error);
        
    }


    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('adminView');
    }
    isLoggedIn(){
        // console.log(localStorage.getItem('isLoggedin'));
        // if (localStorage.getItem('isLoggedin')){
        //     return true;
        // }
        // return false;
        if (localStorage.getItem('adminView')){
            return true;
        }
        return false;
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
