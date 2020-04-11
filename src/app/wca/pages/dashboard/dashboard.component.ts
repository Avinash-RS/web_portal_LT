import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  popularCourses: { img: string; name: string; }[];


  popularCategorires: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
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
  }

  trendingCategorires: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      300: {
        items: 2
      },
      540: {
        items: 3
      },
      740: {
        items: 4
      }
    },
    nav: true
  }
 
  

  constructor() { }

  ngOnInit() {

    this.popularCourses = [{
      img: '../../../../assets/images/shutterstock_131655707.jpg',
      name: 'Business'
    }, {
      img: '../../../../assets/images/shutterstock_345349079.jpg',
      name: 'IT & Software'
    },
    {
      img: '../../../../assets/images/shutterstock_393692671.jpg',
      name: 'Personal Development'
    }, {
      img: '../../../../assets/images/shutterstock_746652751.jpg',
      name: 'Photography'
    }, {
      img: '../../../../assets/images/shutterstock_746652751.jpg',
      name: 'Development'
    }, {
      img: '../../../../assets/images/shutterstock_746652751.jpg',
      name: 'Soft Skill'

    }]


  }

}
