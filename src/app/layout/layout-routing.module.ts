import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'charts-by-category', loadChildren: './charts-by-category/charts.module#ChartsModule'},
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
