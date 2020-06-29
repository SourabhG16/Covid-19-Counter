import { Component, OnInit } from '@angular/core';
import { DataServiceService } from "../../services/data-service.service";
import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';
import { GlobalDataSummary } from 'src/app/Models/global-data';
import { GoogleChartInterface } from "ng2-google-charts";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalConfirmedCases=0;
  totalActiveCases=0;
  totalDeaths=0;
  totalRecoveredCases=0;
  pieChart: GoogleChartInterface={
    chartType: 'PieChart'
  }
  ColumnChart: GoogleChartInterface={
    chartType: 'ColumnChart'
  }
  globalData : GlobalDataSummary[];
  constructor(private dataService: DataServiceService) { }
  
  initChart(caseType : String)
  {
    let dataTable=[];
    dataTable.push(["Country","Cases"]);
    this.globalData.forEach(cs=>{
    let value : number;
    if(caseType.charAt(0)=='c')
      if(cs.confirmed>10000)
      {
        value = cs.confirmed;
      }
    if(caseType.charAt(0)=='a')
      if(cs.active>10000)
      {
        value = cs.active;
      }
    if(caseType.charAt(0)=='r')
      if(cs.recovered>10000)
      {
        value = cs.recovered;
      }
    if(caseType.charAt(0)=='d')
      if(cs.deaths>10000)
      {
        value = cs.deaths;
      }
    if(value!=undefined){
      dataTable.push([cs.country,value])
    }
        console.log('Table',dataTable);
    })

    this.pieChart = {
      chartType: 'PieChart',
      dataTable: dataTable,
      //firstRowIsData: true,
      options: {'Country': 'Cases'}
    };

    this.ColumnChart = {
      chartType: 'ColumnChart',
      dataTable: dataTable,
      //firstRowIsData: true,
      options: {'Country': 'Cases'}
    };
  }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({
      next : (result)=>{
        console.log(result);
        this.globalData=result;
        result.forEach(res=>{
          if (!Number.isNaN(res.confirmed))
          {
          this.totalActiveCases+=res.active;
          this.totalConfirmedCases+=res.confirmed;
          this.totalDeaths+=res.deaths;
          this.totalRecoveredCases+=res.recovered;
          }
        })
        this.initChart('c');
      }
    })
  } 
  updateChart(input : HTMLInputElement)
  {
    this.initChart(input.value);
  }
}
