import { Component, OnInit,OnChanges } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient } from '@angular/common/http';
import { ChartsService } from './charts.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import 'rxjs/add/operator/map';

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
    public years: any[];
    public countries: any[];
    public countriesByRegion: any[];
    public categories: any[];
    
    public g7RealGDPGrowth: any[];
    public bricRealGDPGrowth: any[];
    public mistRealGDPGrowth: any[];
    public tier4RealGDPGrowth: any[];

    public g7Population: any[];
    public bricPopulation: any[];
    public mistPopulation: any[];
    public tier4Population: any[];

    public totPop: any[];
    public allGDPGrowth: any[];
    public totGDPGrowth: any[];


    public anotherTest(testarr: string []): string [] { 
        var testing = [];
        testing.push("hello");
        //console.log(testing);
        //console.log(testarr);
        return testing;
    }

    public onOpen() {
        this.display="block";
    }

    public onClose() {
        this.display="none";
    }

    selectedFile: File = null;
    constructor(private http: HttpClient, private _charts :ChartsService) {
        this.gdpPieChartLabels = this.countries;
        console.log(this.countries);
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

    public FileSelected(event) {
        this.selectedFile = event.target.files[0];
    }

    public onUpload() {
        const fd = new FormData();
        fd.append('image', this.selectedFile, this.selectedFile.name);
        
        //rest API endpoint call 
        //this.http.post('',fd).subscribe(res => 
        //{console.log(res)}) 
    }
    
    // formats the country dataset by year
    public getDatasetByYear(totArr: any [], rgn: any): any[] {
        var retTotArr = new Array();
        var ctryTotArr = new Array();

        for (var ctry = 0; ctry < totArr[0][rgn].length; ctry++) {
            for (var yr = 0; yr < totArr.length; yr++) {
                ctryTotArr.push(totArr[yr][rgn][ctry]);
            }

            retTotArr.push({data: ctryTotArr, label: this.countriesByRegion[0][rgn][ctry]});
            ctryTotArr = [];
        }

        return retTotArr;
    }

    public getAllPopReg(rgn: any): any[] {
        var retTotPop = new Array();
        var ctryTotPop = new Array();
      
        for (var ctry = 0; ctry < this.totPop[0][rgn].length; ctry++) {
            for (var yr = 0; yr < this.totPop.length; yr++) {
                ctryTotPop.push(this.totPop[yr][rgn][ctry]);
            }

            retTotPop.push({data: ctryTotPop, label: this.countriesByRegion[0][rgn][ctry]});
            ctryTotPop = [];
        }

        return retTotPop;
    }

    // base bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
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
   
    // pie
    public pieChartLabels: string[] = [
        'Download Sales',
        'In-Store Sales',
        'Mail Sales'
    ];
    
    public pieChartData: number[] = [300, 500, 100,300, 500, 100];
    public te = this.pieChartData.map(x => x);
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
            // backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            fill: false
            
        },
        {
            // dark grey
            // backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)',
            fill: false
        },
        {
            // grey
            // backgroundColor: 'rgba(148,159,177,0.2)',
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
    }

    public test(enter: string []): void { this.countries = enter; }

    ngOnInit() {
        this.selects=false
        this._charts.chartsInfo().subscribe(res => { 
            //let temp_max = res['list'].map(res => res.main.temp_max);
            let allYears = res['YEARS'].map(res => res.Year);
            let allCategories = res['YEARS'].map(res => res['CATEGORIES'].map(res => res.Category));
            let allCountries = res['YEARS'].map(res => res['CATEGORIES'].map(res => res['COUNTRIES'].map(res => res.name)));
            let allPop = res['YEARS'].map(res => res['CATEGORIES'].map(res => res['COUNTRIES'].map(res => res.population)));
            let allRealGDPGrowth = res['YEARS'].map(res => res['CATEGORIES'].map(res => res['COUNTRIES'].map(res => res.realGDPGrowth)));

            this.years = allYears.sort();
            this.categories = allCategories[0];
            this.countriesByRegion = allCountries;
            this.totPop = allPop;
            this.totGDPGrowth = allRealGDPGrowth;

            var k=0;
            var arr_count:string[] = new Array(6);

            for (var i = 0; i < allCountries[0].length; i++) {
                for( var j = 0; j < allCountries[0][i].length; j++) {
                    arr_count[k]= allCountries[0][i][j];
                    k++;
                }       
            }

            //function testing(arr_count: string []): string[]{ this.countries  = arr_count; return arr_count;}
            this.countries = arr_count;

            //this.gdpPieChartLabels = this.countries;

            this.g7RealGDPGrowth = this.getDatasetByYear(this.totGDPGrowth, 0);
            this.g7Population = this.getAllPopReg(0);

            this.bricRealGDPGrowth = this.getDatasetByYear(this.totGDPGrowth, 1);
            this.bricPopulation = this.getAllPopReg(1);

            this.mistRealGDPGrowth = this.getDatasetByYear(this.totGDPGrowth, 2);
            this.mistPopulation = this.getAllPopReg(2);

            this.tier4RealGDPGrowth = this.getDatasetByYear(this.totGDPGrowth, 3);
            this.tier4Population = this.getAllPopReg(3);
        })
    }

    public retrieveCountry (): string [] {
        return this.countries;
    }
}

interface filteredData {
    countries: string[];
    category: string[];
    year: string;
}
