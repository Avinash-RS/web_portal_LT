import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {
  courses: { name: string; description: string; src: string; }[];
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

  constructor(private formBuilder: FormBuilder) {

    this.detailsForm = this.formBuilder.group({
      username: new FormControl(''),
      email: new FormControl(''),
      course: new FormControl('')
    });


    this.courses = [
      {
        name: 'Javascript',
        description:
          // tslint:disable-next-line:max-line-length
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        src: 'assets/courses/1.jpg',
      },
      {
        name: 'Angular',
        description:
          // tslint:disable-next-line:max-line-length
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        src: 'assets/courses/2.jpg',
      },
      {
        name: 'Web development',
        description:
          // tslint:disable-next-line:max-line-length
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        src: 'assets/courses/3.jpg',
      },
      {
        name: 'Coding',
        description:
          // tslint:disable-next-line:max-line-length
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        src: 'assets/courses/4.jpg',
      },
      {
        name: 'Javascript',
        description:
          // tslint:disable-next-line:max-line-length
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        src: 'assets/courses/1.jpg',
      },
      {
        name: 'Angular',
        description:
          // tslint:disable-next-line:max-line-length
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        src: 'assets/courses/2.jpg',
      },
      {
        name: 'Web development',
        description:
          // tslint:disable-next-line:max-line-length
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        src: 'assets/courses/3.jpg',
      },
      {
        name: 'Coding',
        description:
          // tslint:disable-next-line:max-line-length
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        src: 'assets/courses/4.jpg',
      },
    ];

  }

  ngOnInit() {
  }

}
