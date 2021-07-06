import { Component, OnInit, Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { CalendarEvent, CalendarView,CalendarMonthViewDay, DateFormatterParams, CalendarDateFormatter } from 'angular-calendar'; 

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {

  public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'EEE', locale);
  }
 
  public weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'EEE', locale);
  } 
}

@Component({
  selector: 'app-calendar-activity',
  templateUrl: './calendar-activity.component.html',
  styleUrls: ['./calendar-activity.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
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
