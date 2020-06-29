import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/Models/global-data';
import { DateWiseData } from "../../Models/Date-Wise_data";
import { GoogleChartInterface } from 'ng2-google-charts';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  totalConfirmedCases=0;
  totalActiveCases=0;
  totalDeaths=0;
  totalRecoveredCases=0;
  data:GlobalDataSummary[];
  countryList:String[]=[];
  DateWiseDataa;
  Loading=true;
  selectedCountryData : DateWiseData[];
  lineChart: GoogleChartInterface={
    chartType : 'LineChart'
  }
  constructor(private service:DataServiceService) { }

  ngOnInit(): void {
    
  merge(
    this.service.getDateWiseData().pipe(map(result=>
      {
        this.DateWiseDataa=result;
      })  
      ),
      this.service.getGlobalData().pipe(map(result=>{
        this.data=result;
        this.data.forEach(cs=>{
        this.countryList.push(cs.country);
      })
      }))
      ).subscribe({
        complete:()=>{
          this.updateValues('India');
          this.Loading=false;
      }})
  }
  updateChart()
  {
       let dataTable=[]
       dataTable.push(['date','cases'])
       this.selectedCountryData.forEach(cs=>{
         dataTable.push([cs.date,cs.cases])
       })
      this.lineChart= {
        chartType: 'LineChart',
        dataTable: dataTable,
        //firstRowIsData: true,
        options: {'date': 'cases',
        }
      };
  }
  updateValues(country : string){
    console.log(country);
    this.data.forEach(cs=>{
      if(cs.country==country)
      {
        this.totalActiveCases=cs.active;
        this.totalConfirmedCases=cs.confirmed;
        this.totalDeaths=cs.deaths;
        this.totalRecoveredCases=cs.recovered;
      }
    })
    this.selectedCountryData=this.DateWiseDataa[country];
    console.log(this.selectedCountryData);
    this.updateChart(); 
  }
}
