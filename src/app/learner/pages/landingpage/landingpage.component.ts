import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {
  courses: { name: string; description: string; src: string; rating: number }[];
  // hoverIdx = -1;
  breakpoint: number;

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
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
    nav: true
  };

  constructor() {
    this.courses = [
      {
        name: 'Javascript',
        description:
          // tslint:disable-next-line:max-line-length
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        src: 'assets/courses/1.jpg',
        rating: 5,
      },
      {
        name: 'Angular',
        description:
          // tslint:disable-next-line:max-line-length
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        src: 'assets/courses/2.jpg',
        rating: 5,
      },
      {
        name: 'Web development',
        description:
          // tslint:disable-next-line:max-line-length
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        src: 'assets/courses/3.jpg',
        rating: 5,
      },
      {
        name: 'Coding',
        description:
          // tslint:disable-next-line:max-line-length
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        src: 'assets/courses/4.jpg',
        rating: 5,
      },
      {
        name: 'Javascript',
        description:
          // tslint:disable-next-line:max-line-length
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        src: 'assets/courses/1.jpg',
        rating: 5,
      },
      {
        name: 'Angular',
        description:
          // tslint:disable-next-line:max-line-length
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        src: 'assets/courses/2.jpg',
        rating: 5,
      },
      {
        name: 'Web development and Web Design',
        description:
          // tslint:disable-next-line:max-line-length
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        src: 'assets/courses/3.jpg',
        rating: 5,
      },
      {
        name: 'Coding',
        description:
          // tslint:disable-next-line:max-line-length
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        src: 'assets/courses/4.jpg',
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

}
