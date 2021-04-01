import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DashComponent } from './dash/dash.component';
import { CardComponent } from './card/card.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { HelpComponent } from './help/help.component';
import { TableComponent } from './admin/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { FilterItemDirective } from './admin/table/filter-item-directive';
import { MiniCardComponent } from './mini-card/mini-card.component';
import { GenderChartComponent } from './charts/gender-chart/gender-chart.component';
import { DoaChartComponent } from './charts/doa-chart/doa-chart.component';
import { CooChartComponent } from './charts/coo-chart/coo-chart.component';
import { EmpEduChartComponent } from './charts/emp-edu-chart/emp-edu-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashComponent,
    CardComponent,
    SigninComponent,
    RegisterComponent,
    AdminComponent,
    HelpComponent,
    TableComponent,
    FilterItemDirective,
    MiniCardComponent,
    GenderChartComponent,
    DoaChartComponent,
    CooChartComponent,
    EmpEduChartComponent
  ],
  imports: [
    AngularMaterialModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
