import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView,CalendarMonthViewDay } from 'angular-calendar'; 

@Component({
  selector: 'app-calendar-activity',
  templateUrl: './calendar-activity.component.html',
  styleUrls: ['./calendar-activity.component.scss']
})
export class CalendarActivityComponent implements OnInit {
  events: CalendarEvent[];
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  selectedMonthViewDay: CalendarMonthViewDay;

  constructor() { }

  ngOnInit() {
  }

}
