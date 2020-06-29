import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CountryComponent } from './components/country/country.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { Ng2GoogleChartsModule,GoogleChartInterface } from 'ng2-google-charts';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CountryComponent,
    DashboardCardComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2GoogleChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
