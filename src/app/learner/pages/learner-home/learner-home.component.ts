import { Component, OnInit,TemplateRef } from '@angular/core';
import { LearnerServicesService } from '@learner/services/learner-services.service'
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CommonServicesService } from '@core/services/common-services.service';
import { MatDialog } from '@angular/material';
import { CategoryComponentComponent } from '@core/shared/category-component/category-component.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-learner-home',
  templateUrl: './learner-home.component.html',
  styleUrls: ['./learner-home.component.scss']
})
export class LearnerHomeComponent implements OnInit {
  courseCount: number;
  userDetailes: any;
  pagenumber = 0;
  sort_type: any = "A-Z";
  allcourses: any;
  enrolledCourses: any;
  wishList:any = [];
  yetToStart:any;
  incomplete:any;
  popularsCourse: any;
  loadingCatalogue = false;
  showAppliedFiltre : Boolean =true;
  showCategory : Boolean = true;
  element: any;
  Lvl1CatId: any = [];
  Lvl2CatId: any = [];
  Lvl3CatId: any = [];
  level1selectedID: any = [];
  level2selectedID: any = [];
  level3selectedID: any = [];
  allLvlCategoryFilterVal: any = [];
  allLvlCategory: any;
  paginationpgno: any;
  total_count: number;


  constructor(public learnerService: LearnerServicesService, private router: Router, private gs: GlobalServiceService,
    private loader: Ng4LoadingSpinnerService, public activatedRoute: ActivatedRoute,
    private globalservice: GlobalServiceService,public commonServices: CommonServicesService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userDetailes = this.globalservice.checkLogout();
    this.getEnrolledCourses();
    this.getallcourses();
    this.viewWishlist();
    this.commonServices.globalSearch.subscribe((data: any) => {
      if (data.length > 0) {
        this.allcourses = data;
      }
      else {
        Swal.fire('No courses found');
        this.getallcourses();
      } 
    })
    this.commonServices.globalAllCategory.subscribe((data: any) => {
      this.allcourses = data;
    });
    this.commonServices.globalCourses.subscribe((data: any) => {
      this.allcourses = data;
    });
    this.commonServices.appliedCategory.subscribe((data: any) => {
      this.Lvl1CatId = data.Lvl1CatId;
      this.level1selectedID = data.level1selectedID,
      this.Lvl2CatId= data.Lvl2CatId,
      this.level2selectedID = data.level2selectedID,
      this.Lvl3CatId= data.Lvl3CatId,
      this.level3selectedID = data.level3selectedID,
      this.allLvlCategoryFilterVal=data.allLvlCategoryFilterVal,
      this.allLvlCategory=data.allLvlCategory
  })
  }
  onpagination(event) {
    this.paginationpgno = event;
    this.pagenumber = this.pagenumber + 1;
    this.commonServices.getallcourses(this.userDetailes.group_id[0], event - 1, this.sort_type).subscribe((result: any) => {
      this.allcourses = result.data.get_all_course_by_usergroup.message;
      this.courseCount = result.data.get_all_course_by_usergroup.total_count || result.data.get_all_course_by_usergroup.message.length;
    });
  }
  getallcourses() {
    this.loadingCatalogue = true;
    if (this.userDetailes.group_id)
      this.commonServices.getallcourses(this.userDetailes.group_id[0], this.pagenumber, this.sort_type).subscribe((result: any) => {
        this.allcourses = result.data.get_all_course_by_usergroup.message;
        this.total_count = result.data.get_all_course_by_usergroup.total_count;
        this.loadingCatalogue = false;
      });
  }
  // function to fetch all the enrolled courses of the user
  getEnrolledCourses() {
    this.loadingCatalogue = true;
    this.learnerService.get_enrolled_courses(this.userDetailes.user_id).subscribe((enrolledList: any) => {
      if (enrolledList.data.getLearnerenrolledCourses && enrolledList.data.getLearnerenrolledCourses.success) {
        this.loadingCatalogue = false;
        this.enrolledCourses = enrolledList.data.getLearnerenrolledCourses.data.courseEnrolled;
        this.incomplete = enrolledList.data.getLearnerenrolledCourses.data.suspend[0];
        this.yetToStart = enrolledList.data.getLearnerenrolledCourses.data.incomplete[0];
      }
    });
  }
  // function to fetch the wishlist of the user
 
  viewWishlist() {
    const userdetail = this.gs.checkLogout();
    this.commonServices.viewWishlist(userdetail._id).subscribe((viewWishlist: any) => {
      if (viewWishlist.data.view_wishlist && viewWishlist.data.view_wishlist.success) {
        this.wishList = viewWishlist.data.view_wishlist.message;
      }
    });
  }

  // getting popular course
  getAllPopularcourse(){
    this.loadingCatalogue = true;
    this.learnerService.getPopularcourse().subscribe((popularCourse: any) => {
      if (popularCourse.data.getPopularcourse && popularCourse.data.getPopularcourse.success) {
        this.allcourses = popularCourse.data.getPopularcourse.data;
        this.loadingCatalogue = false;
      }
    });
  }

  onChange(value){
    if(value == 'popularCourse'){
      this.getAllPopularcourse();
    }else{
      this.getallcourses();
    }
  }
  viewCategory(module) {
    let obj = {
      Lvl1CatId : this.Lvl1CatId,
      level1selectedID : this.level1selectedID,
      Lvl2CatId: this.Lvl2CatId,
      level2selectedID : this.level2selectedID,
      Lvl3CatId: this.Lvl3CatId,
      level3selectedID : this.level3selectedID,
      allLvlCategoryFilterVal:this.allLvlCategoryFilterVal,
      allLvlCategory:this.allLvlCategory
    }
    const dg = this.dialog.open(CategoryComponentComponent, {
      width: '95%',  
      data : obj,
    });

    // dg.afterClosed().subscribe((data) => {
    //   this.getallcourses();
    // });
  }
}
