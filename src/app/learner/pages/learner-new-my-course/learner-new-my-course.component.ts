import { Component, OnInit, HostListener, Injectable } from "@angular/core";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AUTO_STYLE, animate, state, style, transition, trigger } from '@angular/animations';
import { Subject } from "rxjs";
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarWeekViewComponent,
  CalendarUtils,
  CalendarGetWeekViewArgs,
  CalendarDateFormatter,
  DateFormatterParams,
} from 'angular-calendar';
import { formatDate } from "@angular/common";

const DEFAULT_DURATION = 300;

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {


 
  public weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
    console.log(formatDate(date, 'EEE', locale))
    return formatDate(date, 'EEE', locale);
  } 
}
@Component({
  selector: "app-learner-new-my-course",
  templateUrl: "./learner-new-my-course.component.html",
  styleUrls: ["./learner-new-my-course.component.scss"],
  animations: [
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out'))
    ])
  ],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})

export class LearnerNewMyCourseComponent implements OnInit {
  isReadMore = true;
  show = true;
  innerWidth: number;
  expandcollapse = true;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];

  //Carousel
  missedTopicsKnowledgeCheck: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
  weekDaysdat: any;

  constructor() { 
  }
  
  @HostListener('window:resize', ['$event'])

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  expandtoggle() {
    this.expandcollapse = !this.expandcollapse;
  }

  showText() {
    this.isReadMore = !this.isReadMore
  }

  info = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
}
