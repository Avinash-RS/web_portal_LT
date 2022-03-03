import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView,CalendarMonthViewDay } from 'angular-calendar';
@Component({
  selector: 'app-upskill-calendar',
  templateUrl: './upskill-calendar.component.html',
  styleUrls: ['./upskill-calendar.component.scss']
  })

export class UpskillCalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  selectedMonthViewDay: CalendarMonthViewDay;
  selectedDays: any = [];
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  setView(view: CalendarView) {
    this.view = view;
  }
  constructor() { }

  ngOnInit() {
  }

}
