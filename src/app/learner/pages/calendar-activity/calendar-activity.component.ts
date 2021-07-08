import { Component, OnInit, Injectable, Input } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
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

const colors: any = {
  activity: {
    primary: '#D9E021',
    secondary: '#eaeadc',
  },
  selfpaced: {
    primary: '#00A99D',
    secondary: '#c5eae8',
  },
  instructor: {
    primary: '#22ACDD',
    secondary: '#abd1de',
  },
};

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
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  selectedMonthViewDay: CalendarMonthViewDay;

  constructor() { }

  ngOnInit() {
  }
  
  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.activity, 
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.instructor, 
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.selfpaced,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.instructor, 
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ]; 

}
