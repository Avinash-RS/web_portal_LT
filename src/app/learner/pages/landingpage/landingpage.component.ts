import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';
import { interval as observableInterval } from 'rxjs';
import { takeWhile, scan, tap } from 'rxjs/operators';
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {
  courses: { course_name: string; course_description: string; course_img_url: string; rating: number }[];
  // hoverIdx = -1;
  breakpoint: number;
  detailsForm: FormGroup;
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
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
    nav: true
  };
  scrollAchieved = false;
  scrollAchievedValue: any;

  constructor(private formBuilder: FormBuilder, @Inject(DOCUMENT) private document: Document, @Inject(Window) private window: Window, ) {

    this.detailsForm = this.formBuilder.group({
      username: new FormControl(''),
      email: new FormControl(''),
      course: new FormControl('')
    });

    this.courses = [
      {
        course_name: 'Javascript',
        course_description:
          // tslint:disable-next-line:max-line-length
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        course_img_url: 'assets/courses/1.jpg',
        rating: 5,
      },
      {
        course_name: 'Angular',
        course_description:
          // tslint:disable-next-line:max-line-length
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        course_img_url: 'assets/courses/2.jpg',
        rating: 5,
      },
      {
        course_name: 'Web development',
        course_description:
          // tslint:disable-next-line:max-line-length
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        course_img_url: 'assets/courses/3.jpg',
        rating: 5,
      },
      {
        course_name: 'Coding',
        course_description:
          // tslint:disable-next-line:max-line-length
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        course_img_url: 'assets/courses/4.jpg',
        rating: 5,
      },
      {
        course_name: 'Javascript',
        course_description:
          // tslint:disable-next-line:max-line-length
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        course_img_url: 'assets/courses/1.jpg',
        rating: 5,
      },
      {
        course_name: 'Angular',
        course_description:
          // tslint:disable-next-line:max-line-length
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        course_img_url: 'assets/courses/2.jpg',
        rating: 5,
      },
      {
        course_name: 'Web development',
        course_description:
          // tslint:disable-next-line:max-line-length
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        course_img_url: 'assets/courses/3.jpg',
        rating: 4,
      },
      {
        course_name: 'Coding and Coding Challenge',
        course_description:
          // tslint:disable-next-line:max-line-length
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        course_img_url: 'assets/courses/4.jpg',
        rating: 5,
      },
    ];
  }

  ngOnInit() {
    if (window.innerWidth <= 600) {
      this.breakpoint = 1;
    } else if (window.innerWidth >= 600 && window.innerWidth <= 768) {
      this.breakpoint = 2;
    } else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
      this.breakpoint = 3;
    } else {
      this.breakpoint = 4;
    }
  }

  onResize(event) {
    if (event.target.innerWidth <= 600) {
      this.breakpoint = 1;
    } else if (event.target.innerWidth >= 600 && event.target.innerWidth <= 768) {
      this.breakpoint = 2;
    } else if (event.target.innerWidth >= 768 && event.target.innerWidth <= 1024) {
      this.breakpoint = 3;
    } else {
      this.breakpoint = 4;
    }
  }

  getScrollValues(e) {
    // console.log(e.scrollTop, 'landing');
    this.scrollAchievedValue = e.scrollTop;
    if (e.scrollTop >= 300) {
      this.scrollAchieved = true;
    }
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.scrollAchieved = false;
  }
}
