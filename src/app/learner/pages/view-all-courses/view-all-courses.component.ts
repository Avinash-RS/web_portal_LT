import { Component, OnInit, TemplateRef } from '@angular/core';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { MatDialog } from '@angular/material';
import { CommonServicesService } from '@core/services/common-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { Options } from 'ng5-slider';
// import { SearchPipe } from '../pipes/search.pipe';
import * as _ from 'lodash';
import Swal from 'sweetalert2';
import { element } from 'protractor';
import { CategoryComponentComponent } from '@core/shared/category-component/category-component.component';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;

@Component({
  selector: 'app-view-all-courses',
  templateUrl: './view-all-courses.component.html',
  styleUrls: ['./view-all-courses.component.scss']
})
export class ViewAllCoursesComponent implements OnInit {
  value = 0;
  highValue = 20;
  options: Options = {
    floor: 2,
    ceil: 24
  };
  courseCount: number;
  userDetailes: any;
  categories: any;
  type: any;
  subcategories: any;
  allcourses: any;
  showdesc = true;
  pagenumber = 0;
  showPublishedDate: boolean;
  btnType: any;
  viewType = 'grid';
  showCount: boolean;
  showRating: boolean;
  displayMode = 1;
  paginationpgno: any;
  loader: boolean;
  sort_type: any = 'A-Z';
  showAppliedFiltre: Boolean = true;
  showMore: Boolean = true;
  errormsg = false;
  allLvlCategory: any;
  Lvl1CatId: any = [];
  Lvl2CatId: any = [];
  Lvl3CatId: any = [];
  guidelineSearchVal: any = [];
  allLvlCategoryFilterVal: any = [];
  selectedlang: any = [];
  coursepartners: any = [];
  coursemode: any = [];
  authorDetails: any = [];
  level1selectedID: any = [];
  level2selectedID: any = [];
  level3selectedID: any = [];
  selectedFilter: any = [];
  isCollapsed: Boolean;
  publishedToDate: string;
  publishedFromDate: string;
  showCategory: Boolean = false;
  element: any;

  constructor(public learnerservice: LearnerServicesService, private alert: AlertServiceService, public translate: TranslateService,
              private dialog: MatDialog, private globalservice: GlobalServiceService, public CommonServices: CommonServicesService) {
    this.btnType = 'Enroll Now';
  }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.userDetailes = this.globalservice.checkLogout();
    if (!this.userDetailes.group_id) {
      this.userDetailes.group_id = '1';
    }
    this.CommonServices.globalSearch.subscribe((data: any) => {
      if (data.length > 0) {
        this.allcourses = data;
      } else {
        Swal.fire('No courses found');
        this.getallcourses();
      }
    });
    this.CommonServices.globalAllCategory.subscribe((data: any) => {
      this.allcourses = data;
    });
    this.CommonServices.globalCourses.subscribe((data: any) => {
        this.allcourses = data;
    });
    this.CommonServices.appliedCategory.subscribe((data: any) => {
      this.Lvl1CatId = data.Lvl1CatId;
      this.level1selectedID = data.level1selectedID,
      this.Lvl2CatId = data.Lvl2CatId,
      this.level2selectedID = data.level2selectedID,
      this.Lvl3CatId = data.Lvl3CatId,
      this.level3selectedID = data.level3selectedID,
      this.allLvlCategoryFilterVal = data.allLvlCategoryFilterVal,
      this.allLvlCategory = data.allLvlCategory;
  });
    this.loadcategoryandcourses();
  }

  sorting(sortval) {
    this.showAppliedFiltre = true;
    if (this.userDetailes.group_id) {
      this.CommonServices.getallcourses(this.userDetailes.group_id[0], this.pagenumber, sortval).subscribe((result: any) => {
        this.allcourses = result.data.get_all_course_by_usergroup.message;
      });
    }
  }

  loadcategoryandcourses() {
    this.type = 'category';
    this.paginationpgno = 0;
    this.getallcourses();
  }

  onDisplayModeChange(mode: number): void {
    this.displayMode = mode;
  }


  getallcourses() {
    if (this.userDetailes.group_id) {
      this.CommonServices.getallcourses(this.userDetailes.group_id[0], this.pagenumber, this.sort_type).subscribe((result: any) => {
        this.allcourses = result.data.get_all_course_by_usergroup.message;
        this.courseCount = result.data.get_all_course_by_usergroup.total_count || result.data.get_all_course_by_usergroup.message.length;
      });
    }
  }

  onpagination(event) {
    this.paginationpgno = event;
    this.pagenumber = this.pagenumber + 1;
    this.CommonServices.getallcourses(this.userDetailes.group_id[0], event - 1, this.sort_type).subscribe((result: any) => {
      // this.allcourses.push(...result.data.get_all_course_by_usergroup.message);
      this.allcourses = result.data.get_all_course_by_usergroup.message;
      this.courseCount = result.data.get_all_course_by_usergroup.total_count || result.data.get_all_course_by_usergroup.message.length;
    });
  }

  viewCategory(module) {
    const obj = {
      Lvl1CatId : this.Lvl1CatId,
      level1selectedID : this.level1selectedID,
      Lvl2CatId: this.Lvl2CatId,
      level2selectedID : this.level2selectedID,
      Lvl3CatId: this.Lvl3CatId,
      level3selectedID : this.level3selectedID,
      allLvlCategoryFilterVal: this.allLvlCategoryFilterVal,
      allLvlCategory: this.allLvlCategory
    };
    const dg = this.dialog.open(CategoryComponentComponent, {
      width: '95%',
      data : obj,
      // panelClass: ['category']
    });

    // dg.afterClosed().subscribe((data) :> {
    //   this.getallcourses();
    // });
  }

}
