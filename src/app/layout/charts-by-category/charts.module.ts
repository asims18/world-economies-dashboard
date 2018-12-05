import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { ChartsService } from './charts.service';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { PageHeaderModule } from '../../shared';

import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [NgbModule,CommonModule, Ng2Charts, ChartsRoutingModule, PageHeaderModule,HttpClientModule,FlexLayoutModule,FormsModule],
    declarations: [ChartsComponent],
    providers: [ChartsService]
})
export class ChartsModule {}
