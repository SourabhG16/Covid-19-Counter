import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent implements OnInit {
  @Input('totalConfirmedCases')
  totalConfirmedCases;
  @Input('totalActiveCases')
  totalActiveCases;
  @Input('totalDeaths')
  totalDeaths;
  @Input('totalRecoveredCases')
  totalRecoveredCases;
  constructor() { }

  ngOnInit(): void {
  }

}
