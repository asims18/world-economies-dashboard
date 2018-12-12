import { Component, OnInit,OnChanges } from '@angular/core';
import { routerTransition } from '../../router.animations';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';
import domtoimage from 'dom-to-image';
import { HttpClient } from '@angular/common/http';
import { ChartsService } from './charts.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import 'rxjs/add/operator/map';

// import { ChartModule } from 'angular2-chartjs';
// import 'chartjs-plugin-labels';




@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    animations: [routerTransition()]
})
export class ChartsComponent implements OnInit {
    display = 'none';
    types: any;
    selects: any;
    country: any;
    vals: string;
    name: any;
    testing: any;
    public years:any [];
    public countries:any [];
    public categories: any[];

    public totGDP:any [];
    public filtGDP:number [];
    public defGDP: any[];

    public totNomGDP:any [];
    public filtNomGDP:number [];
    public defNomGDP: any[];
    
    public totGDPppp:any [];
    public filtGDPppp:number [];
    public defGDPppp: any[];
  
    public totPop:any [];
    public filtPop:number [];
    public defPop: any[];

    public totstandOfLiving:any [];
    public filtstandOfLiving:number [];
    public defstandOfLiving: any[];

    public totConSpend:any [];
    public filtConSpend:number [];
    public defConSpend: any[];

    public totSigConsumSpend:any [];
    public filtSigConsumSpend:number [];
    public defSigConsumSpend: any[];

    public totEaseofDoingBus:any [];
    public filtEaseofDoingBus:number [];
    public defEaseofDoingBus: any[];

    // Added by Asim
    public countries_sorted_by_gdp:any [];
    public countries_sorted_by_gdpppp:any [];
    public countries_sorted_by_population:any [];
    public countries_sorted_by_standard_of_living:any [];
    public countries_sorted_by_consumer_spending:any [];
    public countries_sorted_by_ease_of_doing_business:any [];
    public sorted_gdps:any [];
    public sorted_gdpppps:any [];
    public sorted_populations:any [];
    public sorted_standard_of_living:any [];
    public sorted_consumer_spending:any [];
    public sorted_ease_of_doing_business:any [];

    public standard_datasets: any[];
    // public displayLabels:any;
    public dataset_options = {
        plugins: {
            datalabels: {
               // hide datalabels for all datasets
               display: false
            }
          }
    }
    

    public allPopCat: any[];
    public allGDPGrowth: any[];
    public totGDPGrowth:any[];
    
    
    selectAll(event) {
        this.selects = !this.selects
        console.log(event);
        console.log(event.target.nextSibling.nodeValue);

        for (var i = 0; i < this.types[0].countries.length; i++) {
            
            if( this.types[i].category == event.target.nextSibling.nodeValue){
                var nums = i;
                break;
            }
        }
        
        this.types[nums].selected = this.selects;
        console.log(this.types[nums].selected );
        for (var i = 0; i < this.types[nums].countries.length; i++) {
            this.types[nums].countries[i].selected = this.types[nums].selected;
            console.log(this.types[nums].countries[i].selected)
          }
          //console.log(this.gdpPieChartLabels);
        
          
        
      }
      public getAllPopReg():any[]{
          var retTotPop = new Array();
          var catTotPop = new Array();
          var tot: number = 0;

          for(var a = 0; a < this.totPop[0].length; a++){
                for(var b = 0; b < this.totPop.length; b++){
                        for(var c = 0; c < this.totPop[b][a].length; c++){              
                                tot = tot + Number(this.totPop[b][a][c]);
                        }
                catTotPop.push(tot);
                
                }
                retTotPop.push({data: catTotPop, label: this.categories[a]})
                catTotPop = [];
    }
        return retTotPop;
      }

      //formats the datasest dep
      public getDatasetByYear(totArr: any []):any[]{
        var retTotArr = new Array();
        var catTotArr = new Array();
        var tot: number = 0;
        
       
        
      

        for(var a = 0; a < totArr[0].length; a++){
          console.log("ROUND")
              for(var b = 0; b < totArr.length; b++){
                  
                      for(var c = 0; c < totArr[b][a].length; c++){              
                              tot = tot + Number(totArr[b][a][c]);
                      }
              console.log("tot: ", tot, "label: ",this.categories[a]);
              catTotArr.push(tot);
              
              }
              retTotArr.push({data: catTotArr, label: this.categories[a]})
              catTotArr = [];
  }
      return retTotArr;
    }
    

    public onOpen(){
        this.display="block";
    }
    public onClose(){
        this.display="none";
    }

    selectedFile: File = null;

    constructor(private http: HttpClient, private _charts :ChartsService){
        this.gdpPieChartLabels = this.countries;
       
        this.name = "Hello";
        this.types = [
            {
                category: 'G7',
                selected: false,
                countries: [
                    {country:'USA', selected: false},
                    {country:'Canada', selected: false},
                    {country:'Japan', selected: false},
                    {country:'France', selected: false},
                    {country:'Italy', selected: false},
                    {country:'UK', selected: false}]
            },
            {
                category: 'BRIC',
                selected: false,
                countries: [{country:'Brazil', selected: false},
                {country:'Russia', selected: false},
                {country:'India', selected: false},
                {country:'China', selected: false}]
            },
            {
                category: 'MIST',
                countries: ['Mexico','Indonesia','South Korea','Turkey']
            },
            {
                category: 'Tier 4',
                countries: ['Singapore','Hong Kong','South Africa','Saudi Arabia','Nigeria']
            }  
        ]
        
        
    }
    public FileSelected(event){
        console.log(event);
        this.selectedFile = event.target.files[0];
    }
    public onUpload(){
        const fd = new FormData();
        fd.append('image', this.selectedFile, this.selectedFile.name);
    //rest API endpoint call 
        //this.http.post('',fd).subscribe(res => 
        //{console.log(res)}) 
    }
    // public displayLabels: any = {
    //     scales: {
    //         yAxes: [{
    //             ticks: {
    //                 beginAtZero:true
    //             }
    //         }]
    //     }
    // }
    public displayLabels: any = {
        plugins: {
            labels: {
                render: 'label'
            }
        }
    };
    // public displayLabels: any = {
    //     scaleShowVerticalLines: false,
    //     responsive: true,
    //     scales:{
    //     xAxes: [{
    //         ticks: {
    //           autoSkip: false
    //         }
    //       }]}
    // };
    // base bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales:{
        xAxes: [{
            ticks: {
              autoSkip: false
            }
          }]}
    };
    public barChartLabels: string[] = [
        '2006',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012'
    ];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartData: any[] = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ];
    //pieGDP
    public gdpPieChartLabels: string[] ;
    public gdppieChartData: string[] ;
    
    //public gdpPieChartLabels: string [];
     
      //public gdpPieChartLabels  =  this.countries.map(x => x);
   
    // Pie
    public pieChartLabels: string[] = [
        'Download Sales',
        'In-Store Sales',
        'Mail Sales'
    ];
    
    public pieChartData: number[] = [2, 500, 100,300, 500, 100];
    public pieChartType: string = 'pie';

    // lineChart
    public lineChartData: Array<any> = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
        { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
    ];
    public lineChartLabels: Array<any> = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July'
    ];
    public lineChartOptions: any = {
        responsive: true,

    };
    public lineChartColors: Array<any> = [
        {
            // grey
            //backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            fill: false
            
        },
        {
            // dark grey
            //backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)',
            fill: false
        },
        {
            // grey
            //backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            fill: false
        }
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    public randomize(): void {
        // Only Change 3 values
        const data = [
            Math.round(Math.random() * 100),
            59,
            80,
            Math.random() * 100,
            56,
            Math.random() * 100,
            40
        ];
        const clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    }
    /**
     * filtersForecasts based on the year, category and country selected
     * @param filteredData 
     */
    public filterForeCasts(filteredData: any) {
        console.log(filteredData);
        var nums;
        // Go through every year
        for(var i = 0; i < this.years.length; i++)
        {
            if(filteredData == this.years[i]){
                nums = i;
                break;
            }
        }
        //////////////////////////////////////////////////////////////////////
        console.log('Countries: ');
        console.log(this.countries);
        let allCountriesOneDimension = this.countries;
        let allGDPCopy = this.totGDP[nums];
        let allGDPOneDimension = [].concat.apply([],allGDPCopy);
        let allGDPPPPCopy = this.totGDPppp[nums];
        let allGDPPPPOneDimension = [].concat.apply([],allGDPPPPCopy);
        let allPopCopy = this.totPop[nums];
        let allPopOneDimension = [].concat.apply([],allPopCopy);
        let allStandofLivCopy = this.totstandOfLiving[nums];
        let allStandofLivOneDimension = [].concat.apply([],allStandofLivCopy);
        let allConSpendCopy = this.totConSpend[nums];
        let allConSpendOneDimension = [].concat.apply([],allConSpendCopy);
        let allEaseofDoBusCopy = this.totEaseofDoingBus[nums];
        let allEaseofDoBusOneDimension = [].concat.apply([],allEaseofDoBusCopy);

        // Sort each of the 6 chart values using helper function
        this.sort_descending(allCountriesOneDimension, allGDPOneDimension,  'gdp');
        this.sort_descending(allCountriesOneDimension, allGDPPPPOneDimension,  'gdpppp');
        this.sort_descending(allCountriesOneDimension, allPopOneDimension,  'population');
        this.sort_descending(allCountriesOneDimension, allStandofLivOneDimension,  'standard_of_living');
        this.sort_descending(allCountriesOneDimension, allConSpendOneDimension,  'consumer_spending');
        this.sort_descending(allCountriesOneDimension, allEaseofDoBusOneDimension,  'ease_of_doing_business');
        //////////////////////////////////////////////////////////////////////
        console.log(nums);
        console.log(this.totConSpend[nums]);
        this.translateArray(this.totEaseofDoingBus[nums])
        this.filtGDP = this.translateArray(this.totGDP[nums]);
        this.filtGDPppp = this.translateArray(this.totGDPppp[nums])
        this.filtPop = this.translateArray(this.totPop[nums])
        this.filtstandOfLiving = this.translateArray(this.totstandOfLiving[nums]);
        this.filtConSpend = this.translateArray(this.totConSpend[nums]);
        this.filtEaseofDoingBus = this.translateArray(this.totEaseofDoingBus[nums]);
        console.log(this.filtGDP);
       
       // this.filtGDP = this.totGDP.filter((item) => item.year == filteredData);
    }

    public downloadAll(event): boolean {
        event.preventDefault();

        var zip = new JSZip();

        let pageTitle = document.getElementsByClassName("page-header")[0].textContent;

        var fldr = zip.folder(pageTitle);

        var length = document.getElementsByTagName('canvas').length; 

        for (var i = 0; i < length; i++) {
            try {throw i}
            catch (ii) {
                let chart = document.getElementsByTagName('canvas')[ii];
                chart.toBlob(function(blobpng) {
                    var chartName = chart.offsetParent.firstChild.textContent;
                    fldr.file(chartName + ".png", blobpng, {base64: true});
                    if (ii == length-1) {
                        zip.generateAsync({type: "blob"}).then(blob => {
                            saveAs(blob, pageTitle + ".zip");
                        });
                    }
                }, "image/png", 0.75);
            }
        } 

        return false;
    }

    public translateArray(array : any[]):any[]{ 
        var retArr = [];
        var k = 0;

        for(var i = 0; i < array.length; i++){
            for(var j = 0; j < array[i].length; j++){
                retArr[k]= Number(array[i][j]);
                k++;
            }       
        }
        
        return retArr;
    }
    public getStandofLiving(GDPppp: any[], pop: any[]): any []{ 
        
        
       return pop;
    }
  
    /**
     * Does sorting in descending order for the graphs
     * @param countries A 1D array of countries
     * @param secondary A 1D array of a parameter to sort by
     * @param parameter_sorted_by A string of the name of the parameter to be sorted by
     */
    public sort_descending(countries : any[], secondary: any[], parameter_sorted_by: string){
        let countries_obj = [];
        for (let i = 0; i < countries.length; i++){
            countries_obj[i] = {
                country: countries[i],
                secondary: secondary[i]
            }
        }
        // Utilize the comparison function to compare by the secondary value
        countries_obj.sort(this.compare_descending);
        let countries_sorted = [];
        let secondary_sorted = [];
        for (let i = 0; i < countries.length; i++){
            countries_sorted[i] = countries_obj[i].country 
            secondary_sorted[i] =  countries_obj[i].secondary
        }
        if (parameter_sorted_by =='gdp'){
            this.countries_sorted_by_gdp = countries_sorted;
            this.sorted_gdps =secondary_sorted;
        }
        else if (parameter_sorted_by =='gdpppp') {
            this.countries_sorted_by_gdpppp = countries_sorted;
            this.sorted_gdpppps =secondary_sorted;
        }
        else if (parameter_sorted_by =='population'){
            this.countries_sorted_by_population = countries_sorted;
            this.sorted_populations =secondary_sorted;

        }
        else if (parameter_sorted_by =='standard_of_living') {
            this.countries_sorted_by_standard_of_living = countries_sorted;
            this.sorted_standard_of_living =secondary_sorted;
        }
        else if (parameter_sorted_by =='consumer_spending'){
            this.countries_sorted_by_consumer_spending = countries_sorted;
            this.sorted_consumer_spending =secondary_sorted;

        }
        else if (parameter_sorted_by =='ease_of_doing_business'){
            this.countries_sorted_by_ease_of_doing_business = countries_sorted;
            this.sorted_ease_of_doing_business =secondary_sorted;

        }
        else {
            return console.log('Invalid Parameter to sort by')
        }

    }

    
    /**
     * Does sorting in descending order for the graphs
     * Returns a sorted labels
     * @param countries A 1D array of countries
     * @param secondary A 1D array of a parameter to sort by
     * @param parameter_sorted_by A string of the name of the parameter to be sorted by
     * @param direction A string of the name of the direction to be sorted by ascending or descending
     */
    public sort_countries(countries : any[], secondary: any[], parameter_sorted_by: string, direction: string){
        let countries_obj = [];
        for (let i = 0; i < countries.length; i++){
            countries_obj[i] = {
                country: countries[i],
                secondary: secondary[i]
            }
        }
        // Utilize the comparison function to compare by the secondary value
        if (direction == 'ascending'){
            countries_obj.sort(this.compare_descending);

        }
        else if (direction == 'descending'){
            countries_obj.sort(this.compare);
        }
        else {
            console.log('Need to provide order to sort!');
            return;
        }
        // countries_obj.sort(this.compare_descending);
        let countries_sorted = [];
        let secondary_sorted = [];
        for (let i = 0; i < countries.length; i++){
            countries_sorted[i] = countries_obj[i].country 
            secondary_sorted[i] =  countries_obj[i].secondary
        }
        if (parameter_sorted_by =='gdp'){
            this.countries_sorted_by_gdp = countries_sorted;
            this.sorted_gdps =secondary_sorted;
        }
        else if (parameter_sorted_by =='gdpppp') {
            this.countries_sorted_by_gdpppp = countries_sorted;
            this.sorted_gdpppps =secondary_sorted;
        }
        else if (parameter_sorted_by =='population'){
            this.countries_sorted_by_population = countries_sorted;
            this.sorted_populations =secondary_sorted;

        }
        else if (parameter_sorted_by =='standard_of_living') {
            this.countries_sorted_by_standard_of_living = countries_sorted;
            this.sorted_standard_of_living =secondary_sorted;
        }
        else if (parameter_sorted_by =='consumer_spending'){
            this.countries_sorted_by_consumer_spending = countries_sorted;
            this.sorted_consumer_spending =secondary_sorted;

        }
        else if (parameter_sorted_by =='ease_of_doing_business'){
            this.countries_sorted_by_ease_of_doing_business = countries_sorted;
            this.sorted_ease_of_doing_business =secondary_sorted;

        }
        else {
            return console.log('Invalid Parameter to sort by')
        }

    }

    // TO DO
    // Create a dataset for every category
    // each dataset will be of the size of total countries
    // whatever values within the sorted array aren't of the category will be null
    //

    // Example
    moreData = {
        label: 'Category Name',
        data: [100, null, null, null, null, 9.8, 3.7, null, null, null],
        backgroundColor: 'rgba(145, 132, 20, 0.6)',
        borderWidth: 0,
        yAxisID: "y-axis-gravity"
    };
    //
    // Group categories
    /**
     * Creates the datasets needed 
     * @param countries An array of sorted countries
     * @param secondary An array of sorted secondary value
     * @param categories An array of all the categories
     * @param country_category_pairings A grouping of which countries belong to which category
     */
    public createDatasets(countries : any[], secondary: any[], categories: any[]){
        let dataSets = []
        // Loops through and initializes the datasets
        for (let i = 0; i < categories.length; i++){
            dataSets[i] = {
                label: categories[i].Category,
                data: [],
                barPercentage: 1.0,
                categoryPercentage: 1.0,
                barThickness: 50
                // borderWidth: 0,
                // yAxisID: 'years'
            }
        }
        // Loops though all of the countries
        for (let i = 0; i < countries.length; i++){
            // loops through all datasets
            // for (let j = 0; j < countries.length; j++){
            //     if (dataSets[i].label = coi)
            //     dataSet[j].data[i] =
            // }
            
            // Loops through all the categeroies
            for (let j = 0; j < categories.length; j++){
                // Looks for the country within each category
                // console.log(categories.find(obj => obj.Category == 'MIST'));
                let country_object = categories[j].COUNTRIES.find( obj => obj.name == countries[i]);
                // If it was found in the current 
                if (typeof country_object != 'undefined'){
                    //set the value in the appropriate dataset
                    dataSets[j].data[i] = secondary[i];
                }
                
            }
            
        }
        // console.log(dataSets);
        return dataSets;
    }

    // Helper functions for sorting
    /**
     * Compares in ascending oder
     * @param a 
     * @param b 
     */
    public compare(a,b) {
        if (parseFloat(a.secondary) < parseFloat(b.secondary))
          return -1;
        if (parseFloat(a.secondary) > parseFloat(b.secondary))
          return 1;
        return 0;
    }
    /**
     * Compares in descending order
     * @param a 
     * @param b 
     */
    public compare_descending(a,b) {
        if (parseFloat(a.secondary) > parseFloat(b.secondary))
          return -1;
        if (parseFloat(a.secondary) < parseFloat(b.secondary))
          return 1;
        return 0;
    }


    ngOnInit() {
        this.selects=false
        //mapping object
        this._charts.chartsInfo().subscribe(res => { 
         //let temp_max = res['list'].map(res => res.main.temp_max);
         let all = res['YEARS'].map(res => res);
          let allYears = res['YEARS'].map(res => res.Year);
          let allCategories = res['YEARS'].map(res => res['CATEGORIES'].map(res => res.Category));
          let allCountries = res['YEARS'].map(res => res['CATEGORIES'].map(res => res['COUNTRIES'].map(res => res.name)));
        //   allCountries = allCountries.sort();

          let allGDP = res['YEARS'].map(res => res['CATEGORIES'].map(res => res['COUNTRIES'].map(res => res.realGDP)));
          let allNomGDP = res['YEARS'].map(res => res['CATEGORIES'].map(res => res['COUNTRIES'].map(res => res.nominalGDP)));
          let allNomGDPppp = res['YEARS'].map(res => res['CATEGORIES'].map(res => res['COUNTRIES'].map(res => res.gdpPpp)));
          let allStandofLiv = res['YEARS'].map(res => res['CATEGORIES'].map(res => res['COUNTRIES'].map(res => res.standardOfLiving)));
          let allPop = res['YEARS'].map(res => res['CATEGORIES'].map(res => res['COUNTRIES'].map(res => res.population)));
          let allConSpend = res['YEARS'].map(res => res['CATEGORIES'].map(res => res['COUNTRIES'].map(res => res.consumerSpending)));
          let allEaseofDoBus = res['YEARS'].map(res => res['CATEGORIES'].map(res => res['COUNTRIES'].map(res => res.easeOfDoingBusiness)));

          
          let allRealGDPGrowth = res['YEARS'].map(res => res['CATEGORIES'].map(res => res['COUNTRIES'].map(res => res.realGDPGrowth)));
          //for the other graphs

          let TotesCategories = res['YEARS'].map(res => res['CATEGORIES']);
        //all the information for that one section in the JSON 
          this.totGDP = allGDP;
          this.totNomGDP = allNomGDP;
          this.years = allYears;
          this.totGDPppp = allNomGDPppp;
          this.totEaseofDoingBus = allEaseofDoBus;
          this.totPop = allPop;
          this.totConSpend = allConSpend;
          this.totstandOfLiving = allStandofLiv;

          this.totGDPGrowth = allRealGDPGrowth;
    
          var k =0;
          var arr_count:string[] = new Array(6) ;
          //debugger;
        for(var i = 0; i < allCountries[0].length; i++){
            for(var j = 0; j < allCountries[0][i].length; j++){
                arr_count[k]= allCountries[0][i][j];
                k++;
            }       
        }
        //function testing(arr_count: string []): string[]{ this.countries  = arr_count; return arr_count;}
        this.countries = arr_count;
        //////////////////////////////////////////////////////////////////////////////////////////
        // this.displayLabels = {
        //     plugins: {
        //         labels: [
        //             {
        //                 render: 'label',
        //                 position: 'outside'
        //             },
        //             {
        //                 render: 'percentage'
        //             }
        //         ]
        //     }
        // }
        // Works
        // this.displayLabels = {
        //     plugins: {
        //         labels: {
        //             render: 'label'
        //         }
        //     }
        // }
        // this.displayLabels = {
        //     scales: {
        //         yAxes: [{
        //             ticks: {
        //                 beginAtZero:true
        //             }
        //         }]
        //     }
        // }
        // Need to sort allCountries
        let allCountriesCopy = allCountries[0];
        let allCountriesOneDimension = [].concat.apply([],allCountriesCopy);
        let allGDPCopy = allGDP[0];
        let allGDPOneDimension = [].concat.apply([],allGDPCopy);
        let allGDPPPPCopy = allNomGDPppp[0];
        let allGDPPPPOneDimension = [].concat.apply([],allGDPPPPCopy);
        let allPopCopy = allPop[0];
        let allPopOneDimension = [].concat.apply([],allPopCopy);
        let allStandofLivCopy = allStandofLiv[0];
        let allStandofLivOneDimension = [].concat.apply([],allStandofLivCopy);
        let allConSpendCopy = allConSpend[0];
        let allConSpendOneDimension = [].concat.apply([],allConSpendCopy);
        let allEaseofDoBusCopy = allEaseofDoBus[0];
        let allEaseofDoBusOneDimension = [].concat.apply([],allEaseofDoBusCopy);

        this.sort_descending(allCountriesOneDimension, allGDPOneDimension,  'gdp');
        this.sort_descending(allCountriesOneDimension, allGDPPPPOneDimension,  'gdpppp');
        this.sort_descending(allCountriesOneDimension, allPopOneDimension,  'population');
        this.sort_descending(allCountriesOneDimension, allStandofLivOneDimension,  'standard_of_living');
        this.sort_descending(allCountriesOneDimension, allConSpendOneDimension,  'consumer_spending');
        this.sort_descending(allCountriesOneDimension, allEaseofDoBusOneDimension,  'ease_of_doing_business');
        console.log(TotesCategories);
        this.standard_datasets = this.createDatasets(this.countries_sorted_by_standard_of_living, this.sorted_standard_of_living, TotesCategories[0]);
        console.log(this.standard_datasets);
        //////////////////////////////////////////////////////////////////////////////////////////

        this.categories = allCategories[0];
        
        this.defGDP = this.translateArray(allGDP[0]);
        console.log('Def GDPS: ');
        console.log(allGDP);
        this.filtGDP = this.defGDP;

        this.defNomGDP = this.translateArray(allNomGDP[0]);
        this.filtNomGDP = this.defGDP;

        this.defGDPppp = this.translateArray(allNomGDPppp[0]);
        this.filtGDPppp = this.defGDPppp;

        //this.totstandOfLiving = this.getStandofLiving(this.totGDPppp, this.totPop);
        this.defstandOfLiving = this.translateArray(this.totstandOfLiving[0]);
        this.filtstandOfLiving = this.defstandOfLiving;

        this.defPop = this.translateArray(allPop[0]);
        this.filtPop = this.defPop;

        this.defConSpend = this.translateArray(this.totConSpend[0]);
        this.filtConSpend = this.defConSpend;

        this.defEaseofDoingBus = this.translateArray(allEaseofDoBus[0]);
        this.filtEaseofDoingBus = this.defEaseofDoingBus;

        this.allPopCat = this.getAllPopReg();
        this.allGDPGrowth = this.getDatasetByYear(this.totGDPGrowth);
          
          console.log(this.allPopCat);
          console.log(this.barChartData);
          
          
          
    })
          
    
       
}
public retrieveCountry (): number []{
    
    return this.filtGDP;
}

    
}
interface ChartLab {
    name: any [],
    label: string
}


