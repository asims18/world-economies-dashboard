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

    ngOnInit() {
        this.uploader.onBuildItemForm = (item, form) => {
            // console.log('Building Form!!!!!');
            form.append('name', 'test');
        };
        this.uploader.onAfterAddingFile = (file) => {
            // console.log('Building Form!!!!!');
            file.withCredentials = false;
        };
        // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        //     console.log('HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII');
        //     // console.log('ImageUpload:uploaded:', item, status, response);
        //     alert('File uploaded successfully');
        // };
        this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
        this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    }


    // Function to read all the file data from an uploaded file and returns a json object
    readFileData() {
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#csv');
        let fileToUpload = inputEl.files.item(0);
        var reader = new FileReader();
        let data = {
            YEARS: []
        }
        reader.onload = (e) => {
            
            // First split the result line by line
            let split_by_lines = reader.result.toString().split('\r\n');

            // Loops through every line
            for (let i = 1; i < split_by_lines.length -1; i++){
                // Split every line by comma
                let comma_split = split_by_lines[i].split(',');

                // All data is made up of an array of years
                let current_year = comma_split[2];
                // All years are made up of an array of categories
                let current_category = comma_split[1];
                // All categories are made up of an array of countries
                let current_country = comma_split[0];

                // All countries are made up of the following attributes
                let current_nominalgdp = comma_split[3];
                let current_realgdp = comma_split[4];
                let current_nominalgdpgrowth = comma_split[5];
                let current_realgdpgrowth = comma_split[6];
                let current_gdpppp = comma_split[7];
                let current_population = comma_split[8];
                let current_populationgrowth = comma_split[9];
                let current_consumerspending = comma_split[10];
                let current_easeofdoingbusiness = comma_split[11];
                let current_unemployment = comma_split[12];
                let current_retailsalesgrowth = comma_split[13];

                // Creating objects to add to json result object
                let current_year_object = {
                    Year: current_year,
                    CATEGORIES: []
                }
                let current_category_object = {
                    Category: current_category,
                    COUNTRIES: []
                }
                let current_country_object = {
                    name: current_country,
                    nominalGDP: current_nominalgdp,
                    realGDP: current_realgdp,
                    nominalGDPGrowth: current_nominalgdpgrowth,
                    realGDPGrowth: current_realgdpgrowth,
                    gdpPpp: current_gdpppp,
                    population: current_population,
                    populationGrowth: current_populationgrowth,
                    consumerSpending: current_consumerspending,
                    easeOfDoingBusiness: current_easeofdoingbusiness,
                    unemployment: current_unemployment,
                    retailSalesGrowth: current_retailsalesgrowth
                }

                // Create 2 year objects
                // Finds if that object exists in the array
                // let year_object = data.YEARS.find( obj => obj.Year == current_year);
                // if (typeof year_object == "undefined"){
                //     data.YEARS.push(current_year_object);
                // }
                // else {
                //     let category_object = year_object.CATEGORIES.find( obj => obj.Category == current_category );
                //     if (typeof category_object == "undefined"){
                //         year_object.CATEGORIES.push(current_category_object);
                //     }
                //     else {
                //         let country_object = category_object.COUNTRIES.find( obj => obj.name == current_country );
                //         if (typeof country_object == "undefined"){
                //             category_object.COUNTRIES.push(current_country_object);
                //         }
                //     }
                // }

                // Sees if the current year exists within the year array
                let year_object = data.YEARS.find( obj => obj.Year == current_year);
                // If not push it to the array of years
                if (typeof year_object == "undefined"){
                    data.YEARS.push(current_year_object);
                    year_object = data.YEARS.find( obj => obj.Year == current_year);
                }
                // Sees if the current category exists within the category array
                let category_object = year_object.CATEGORIES.find( obj => obj.Category == current_category );
                // If not push it to the array of categories
                if (typeof category_object == "undefined"){
                    year_object.CATEGORIES.push(current_category_object);
                    category_object = year_object.CATEGORIES.find( obj => obj.Category == current_category );
                }
                // Sees if the current country exists within the countryarray
                let country_object = category_object.COUNTRIES.find( obj => obj.name == current_country );
                // If not push it to the array of countries
                if (typeof country_object == "undefined"){
                    category_object.COUNTRIES.push(current_country_object);
                    country_object = category_object.COUNTRIES.find( obj => obj.name == current_country );
                }    
            }

            console.log(data);
            // alert(reader.result.toString().split(','));
            
        }
        reader.readAsText(fileToUpload);
        // Still need to post json object to server

        // this.http.get('http://localhost:4200/assets/economies.json').subscribe(data => {
        //     console.log(data);
        // })
        // Gets the data from the file
        // this.http.get('http://localhost:4200/assets/economies.json').subscribe(data => {
        //     console.log(data);
        // })
        // this.http.post('http://localhost:4200/assets/economies.json',data).subscribe(response => {
        //     console.log(response);
        // });
        
        return data;

    }

    // upload() {
    //     console.log('HERE!!!!!')
    //     var headers = new HttpHeaders();
    //     // headers.set('Content-Type', 'application/json');
    //     // headers.set('Content-Type', 'multipart/form-data');
    //     // this.http.post(URL, upload, {headers: headers});
    //     //locate the file element meant for the file upload.
    //     let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#csv');
    //     //get the total amount of files attached to the file input.
    //     let fileCount: number = inputEl.files.length;
    //     //create a new formdata instance
    //     let formData = new FormData();
    //     //check if the filecount is greater than zero, to be sure a file was selected.
    //     if (fileCount > 0) { // a file was selected
    //         let fileToUpload = inputEl.files.item(0);
    //         // fileToUpload.name = 'uploads\\' + fileToUpload.name
    //         console.log(fileToUpload)
    //         // 'uploads\\10-14-2018-WED data file.csv'
    //         let filepath = 'uploads\\' + fileToUpload.name
    //         fileToUpload
    //         //append the key name 'photo' with the first file in the element
    //         // formData.append('fileKey', fileToUpload, fileToUpload.name);
    //         // formData.append('csv', fileToUpload);
    //         formData.append('file', fileToUpload);
    //         formData.append('name', 'CSVDATA');
    //         //call the angular http method
    //         this.http
    //             //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
    //             .post(URL, formData,{headers: headers} ).subscribe(
    //                 //map the success function and alert the response
    //                 (success) => {
    //                     alert('File uploaded successfully!');
    //                     console.log(success);
    //                 },
    //                 (error) => {
    //                     alert('File not uploaded!');
    //                     console.log(error);
    //                 }
    //             )
    //     }
    // }

     //the function which handles the file upload without using a plugin.
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
            // .subscribe( (error) => {
            //     console.log(typeof error);
            //     // if (response){
            //     //     alert('File uploaded successfully!');
            //     // }
            //     // else {
            //     //     alert('File not uploaded!');         
            //     // }
            //     }
            // )
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
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
