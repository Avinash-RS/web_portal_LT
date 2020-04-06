import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '@learner/services/learner-services.service'
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-learner-home',
  templateUrl: './learner-home.component.html',
  styleUrls: ['./learner-home.component.scss']
})
export class LearnerHomeComponent implements OnInit {

  tiles: any = [];
  userDetailes: any;
  panelOpenState = false;
  state$: any;
  breakpoint: number;
  bannerImg: {}[];
  myCoursesList: any;

  bannerOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  partnerOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true
  }

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
        items: 5
      }
    },
    nav: true
  }
  partnerImg: {}[];

  popularCourses:{}[];




  constructor(public service: LearnerServicesService, private router: Router, private gs: GlobalServiceService,
    private loader: Ng4LoadingSpinnerService, public activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
      this.breakpoint = (window.innerWidth <= 400) ? 1 : 4;
      this.userDetailes =JSON.parse(localStorage.getItem('UserDetails')) || null;
    this.userDetailes = JSON.parse(localStorage.getItem('UserDetails')) || null;
    this.popularCourses = [{
      img: '../../../../assets/images/shutterstock_131655707.jpg',
      name:'Business'
    }, {
      img: '../../../../assets/images/shutterstock_345349079.jpg',
      name:'IT & Software'
    },
    {
      img: '../../../../assets/images/shutterstock_393692671.jpg',
      name:'Personal Development'
    },{
      img: '../../../../assets/images/shutterstock_746652751.jpg',
      name:'Photography'
    },{
      img: '../../../../assets/images/shutterstock_746652751.jpg',
      name:'Development'
    },{
      img: '../../../../assets/images/shutterstock_746652751.jpg',
      name:'Soft Skill'
    },
    
    

  ]
    this.bannerImg = [{
      src: '../../../../assets/learner/home1.jpg'
    }, {
      src: '../../../../assets/learner/home2.jpg'
    },
    {
      src: '../../../../assets/learner/lens.jpg'
    }]

    this.partnerImg = [{
      src: '../../../../assets/learner/vit.png'
    }, {
      src: '../../../../assets/learner/saveetha.png'
    },
    {
      src: '../../../../assets/learner/srm.png'
    },
    {
      src: '../../../../assets/learner/8.jpg'
    },{
      src: '../../../../assets/learner/vit.png'
    }, {
      src: '../../../../assets/learner/saveetha.png'
    },
    {
      src: '../../../../assets/learner/srm.png'
    },
    {
      src: '../../../../assets/learner/8.jpg'
    },{
      src: '../../../../assets/learner/vit.png'
    }, {
      src: '../../../../assets/learner/saveetha.png'
    },
    {
      src: '../../../../assets/learner/srm.png'
    },
    {
      src: '../../../../assets/learner/8.jpg'
    },{
      src: '../../../../assets/learner/vit.png'
    }, {
      src: '../../../../assets/learner/saveetha.png'
    },
    {
      src: '../../../../assets/learner/srm.png'
    },
    {
      src: '../../../../assets/learner/8.jpg'
    },]

    this.service.getMyCourse('5e7f5125dba4466d9707629c').subscribe((getMyCourse: any) => {
      if (getMyCourse.data.get_course_by_user) {
        if (getMyCourse.data.get_course_by_user.success) {
          this.myCoursesList = getMyCourse.data.get_course_by_user.message;
          // this.loader.hide
        }
      }
    });

  }
  myCourses() {

  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 4;
  }
}
