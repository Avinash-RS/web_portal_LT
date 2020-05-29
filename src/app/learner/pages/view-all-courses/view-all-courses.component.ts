import { Component, OnInit, TemplateRef } from '@angular/core';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { MatDialog } from '@angular/material';
import { CommonServicesService } from '@core/services/common-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { Options } from 'ng5-slider';
import * as _ from 'lodash';
import Swal from 'sweetalert2';
import { element } from 'protractor';
declare var $: any;

@Component({
  selector: 'app-view-all-courses',
  templateUrl: './view-all-courses.component.html',
  styleUrls: ['./view-all-courses.component.scss']
})
export class ViewAllCoursesComponent implements OnInit {
  value: number = 0;
  highValue: number = 20;
  options: Options = {
    floor: 2,
    ceil: 24
  };
  userDetailes: any;
  categories: any;
  type: any;
  subcategories: any;
  allcourses: any;
  showdesc = true;
  pagenumber = 0;
  showPublishedDate: boolean;
  btnType: any;
  viewType: string = 'grid';
  showCount: boolean;
  showRating: boolean;
  displayMode: number = 1;
  paginationpgno: any;
  loader: boolean;
  sort_type: any = "A-Z";
  showAppliedFiltre: boolean;
  showMore: Boolean = true;
  errormsg: boolean = false;
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
  publishedToDate: String;
  publishedFromDate: String;

  constructor(public learnerservice: LearnerServicesService, private alert: AlertServiceService,
    private dialog: MatDialog, private globalservice: GlobalServiceService, public CommonServices: CommonServicesService) {
    this.btnType = "Enroll Now"
  }

  ngOnInit() {
    this.getthreeLevelCat();
    this.userDetailes = this.globalservice.checkLogout();
    if (!this.userDetailes.group_id) {
      this.userDetailes.group_id = '1';
    }
    this.CommonServices.globalSearch.subscribe((data: any) => {
      if (data.length > 0) {
        this.allcourses = data;
      }
      else {
        Swal.fire('No courses found');
        this.allcourses = this.allcourses;
      } 
    })
    this.CommonServices.globalCourses.subscribe((data: any) => {
        this.allcourses = data;
    })
    this.CommonServices.globalFilterCategory.subscribe((data: any) => {
      if(!data.length){
        this.allLvlCategoryFilterVal = data;
        this.selectedFilter = [];
        this.Lvl1CatId = [];
        this.level1selectedID = [];
        this.Lvl2CatId = [];
        this.level2selectedID = [];
        this.Lvl3CatId = [];
        this.level3selectedID = [];
        this.allLvlCategory = [];
        this.getthreeLevelCat();
      } 
  })
  this.CommonServices.globalCategory.subscribe((data: any) => {
    if(!data.length){
      this.Lvl1CatId = data.Lvl1CatId;
      this.level1selectedID = data.level1selectedID;
      this.Lvl2CatId = data.Lvl2CatId;
      this.level2selectedID = data.level2selectedID;
      this.Lvl3CatId = data.Lvl3CatId;
      this.level3selectedID = data.level3selectedID;
    } 
})
    this.loadcategoryandcourses();
  }


  isSelected(s: any) {
    if (s.level == 1) {
      return this.Lvl1CatId.findIndex((item) => item.category_id === s.category_id) > -1 ? true : false;
    } else if (s.level == 2) {
      return this.Lvl2CatId.findIndex((item) => item.sub_category_id === s.sub_category_id) > -1 ? true : false;
    } else {
      return this.Lvl3CatId.findIndex((item) => item.super_sub_category_id === s.super_sub_category_id) > -1 ? true : false;
    }
  }

  getCategoryId(category) {
    if (category.level == 1) {
      this.isSelected(category)
      this.Lvl1CatId.find((item) => item.category_id === category.category_id) ?
        this.Lvl1CatId = this.Lvl1CatId.filter((item) => item.category_id !== category.category_id) : this.Lvl1CatId.push(category);
      this.level1selectedID = this.Lvl1CatId.flatMap(i => i.category_id)
    } else if (category.level == 2) {
      this.isSelected(category)
      this.Lvl2CatId.find((item) => item.sub_category_id === category.sub_category_id) ? this.Lvl2CatId = this.Lvl2CatId.filter((item) => item.sub_category_id !== category.sub_category_id) : this.Lvl2CatId.push(category);
      this.level2selectedID = this.Lvl2CatId.flatMap(i => i.sub_category_id)
    } else if ((category.level == 3)) {
      this.isSelected(category)
      this.Lvl3CatId.find((item) => item.super_sub_category_id === category.super_sub_category_id) ? this.Lvl3CatId = this.Lvl3CatId.filter((item) => item.super_sub_category_id !== category.super_sub_category_id) : this.Lvl3CatId.push(category);
      this.level3selectedID = this.Lvl3CatId.flatMap(i => i.super_sub_category_id)
    } else {
      this.getthreeLevelCat();
    }

    if (this.level1selectedID.length || this.level2selectedID.length || this.level3selectedID.length) {
      this.learnerservice.getLevelSubCategoryData(this.level1selectedID, this.level2selectedID, this.level3selectedID).subscribe((result: any) => {
        if (result['data']['getLevelSubCategoryData'].success == true) {
          this.allLvlCategoryFilterVal = result['data']['getLevelSubCategoryData']['data'];
        }
      });
    } else {
      this.allLvlCategoryFilterVal = [];
      this.getthreeLevelCat();
    }
  }

  removeCategoryVal(val){
    let cat1Index;
    let cat2Index;
    let cat3Index;
   
    if(val.level == 1) cat1Index = this.Lvl1CatId.indexOf(val);
    if (cat1Index > -1) {
      this.selectedFilter.category1.splice(cat1Index, 1);
      this.isSelected(val);
      this.Lvl1CatId.find((item) => item.category_id === val.category_id) ?
      this.Lvl1CatId = this.Lvl1CatId.filter((item) => item.category_id !== val.category_id) : this.Lvl1CatId.push(val);
      this.level1selectedID = this.Lvl1CatId.flatMap(i => i.category_id);
      if(this.allLvlCategoryFilterVal && this.allLvlCategoryFilterVal.level1 && this.allLvlCategoryFilterVal.level1.length) {
        this.allLvlCategoryFilterVal.level1.forEach(element=>{
          if(element.category_id == val.category_id) element.isSelected = false;
        })
      } else {
        this.allLvlCategory.level1.forEach(element=>{
          if(element.category_id == val.category_id) element.isSelected = false;
        })
      }

    }
    else if(val.level == 2) cat2Index = this.Lvl2CatId.indexOf(val);
    if (cat2Index > -1) {
      this.selectedFilter.category2.splice(cat2Index, 1);
      this.isSelected(val);
      this.Lvl2CatId.find((item) => item.sub_category_id === val.sub_category_id) ?
      this.Lvl2CatId = this.Lvl2CatId.filter((item) => item.sub_category_id !== val.sub_category_id) : this.Lvl2CatId.push(val);
      this.level2selectedID = this.Lvl2CatId.flatMap(i => i.sub_category_id);
      if(this.allLvlCategoryFilterVal && this.allLvlCategoryFilterVal.level2 && this.allLvlCategoryFilterVal.level2.length) {
        this.allLvlCategoryFilterVal.level2.forEach(element=>{
          if(element.sub_category_id == val.sub_category_id) element.isSelected = false;
        })
      } else {
        this.allLvlCategory.level2.forEach(element=>{
          if(element.sub_category_id == val.sub_category_id) element.isSelected = false;
        })
      }
    }
    else if(val.level == 3) cat3Index = this.Lvl3CatId.indexOf(val);
    if (cat3Index > -1) {
      this.selectedFilter.category3.splice(cat3Index, 1);
      this.isSelected(val);
      this.Lvl3CatId.find((item) => item.super_sub_category_id === val.super_sub_category_id) ?
      this.Lvl3CatId = this.Lvl3CatId.filter((item) => item.super_sub_category_id !== val.super_sub_category_id) : this.Lvl1CatId.push(val);
      this.level3selectedID = this.Lvl3CatId.flatMap(i => i.super_sub_category_id);
      if(this.allLvlCategoryFilterVal && this.allLvlCategoryFilterVal.level3 && this.allLvlCategoryFilterVal.level3.length) {
        this.allLvlCategoryFilterVal.level3.forEach(element=>{
          if(element.super_sub_category_id == val.super_sub_category_id) element.isSelected = false;
        })
      } else {
        this.allLvlCategory.level3.forEach(element=>{
          if(element.super_sub_category_id == val.super_sub_category_id) element.isSelected = false;
        })
      }
    }
   


    var perPage = "10";
    this.learnerservice.postGuildelineSearchData(this.Lvl1CatId, this.Lvl2CatId, this.Lvl3CatId, this.selectedlang, this.coursemode,
      this.authorDetails, this.coursepartners, this.pagenumber, perPage, this.publishedToDate, this.publishedFromDate).subscribe((result: any) => {
        this.allcourses = result['data']['getCourseCategorySearch']['data'];
        this.countUpdateInstructor(result['data']['getCourseCategorySearch']['instructor'])
        this.countUpdateLanguage(result['data']['getCourseCategorySearch']['languageCount'])
        this.countUpdatePartner(result['data']['getCourseCategorySearch']['partner'])
        this.countUpdateCoursemode(result['data']['getCourseCategorySearch']['courseMode'])
      })
  }

  applyFilter(category) {
    var perPage = "10";
    this.learnerservice.postGuildelineSearchData(this.level1selectedID, this.level2selectedID, this.level3selectedID, this.selectedlang, this.coursemode,
      this.authorDetails, this.coursepartners, this.pagenumber, perPage, this.publishedToDate, this.publishedFromDate).subscribe((result: any) => {
        if (result['data']['getCourseCategorySearch'].success == true)
          this.allcourses = result['data']['getCourseCategorySearch']['data'];
        this.countUpdateInstructor(result['data']['getCourseCategorySearch']['instructor'])
        this.countUpdateLanguage(result['data']['getCourseCategorySearch']['languageCount'])
        this.countUpdatePartner(result['data']['getCourseCategorySearch']['partner'])
        this.countUpdateCoursemode(result['data']['getCourseCategorySearch']['courseMode'])
        this.dialog.closeAll();
      })
  }

  filter() {
    if (!this.selectedFilter || !this.selectedFilter.filterVal) {
      this.selectedFilter.category1 = [];
      this.selectedFilter.category2 = [];
      this.selectedFilter.category3 = [];

      this.selectedFilter.category1 = this.selectedFilter.category1.concat(this.Lvl1CatId)
      this.selectedFilter.category2 = this.selectedFilter.category2.concat(this.Lvl2CatId)
      this.selectedFilter.category3 = this.selectedFilter.category3.concat(this.Lvl3CatId)

      this.learnerservice.getGuidelineSearch().subscribe((result: any) => {
        if (result['data']['getDetailsCount']['success'] == 'true') {
          this.guidelineSearchVal = result['data']['getDetailsCount']['message'];
          if (this.guidelineSearchVal && this.guidelineSearchVal.course_data) {
            this.guidelineSearchVal.course_data.forEach(element => {
              element.checked = false;
            });
          }
          if (this.guidelineSearchVal && this.guidelineSearchVal.author_data) {
            this.guidelineSearchVal.author_data.forEach(element => {
              element.checked = false;
            });
          }
          if (this.guidelineSearchVal && this.guidelineSearchVal.coursemode_data) {
            this.guidelineSearchVal.coursemode_data.forEach(element => {
              element.checked = false;
            });
          }
          if (this.guidelineSearchVal && this.guidelineSearchVal.coursepartner_data) {
            this.guidelineSearchVal.coursepartner_data.forEach(element => {
              element.checked = false;
            });
          }
        } else {
          //  this.alert.openAlert('Filter not found',null)
        }
        let obj = {
          selectedFilterCategory1 : this.selectedFilter.category1,
          selectedFilterCategory2 : this.selectedFilter.category2,
          selectedFilterCategory3 : this.selectedFilter.category3,
          guidelineSearchVal : this.guidelineSearchVal,
          Lvl1CatId: this.Lvl1CatId,
          level1selectedID : this.level1selectedID,
          Lvl2CatId: this.Lvl2CatId,
          level2selectedID : this.level2selectedID,
          Lvl3CatId: this.Lvl3CatId,
          level3selectedID : this.level3selectedID,
          allLvlCategoryFilterVal : this.allLvlCategoryFilterVal,
          allLvlCategory: this.allLvlCategory
        }
        this.CommonServices.globalFilter$.next(obj);
      })
    }
  }


  sorting(sortval) {
    this.showAppliedFiltre = false;
    if (this.userDetailes.group_id)
      this.learnerservice.getallcourses(this.userDetailes.group_id[0], this.pagenumber, sortval).subscribe((result: any) => {
        this.allcourses = result.data.get_all_course_by_usergroup.message;
      });
  }

  loadcategoryandcourses() {
    this.type = 'category';
    this.paginationpgno = 0;
    this.getcoursecategories();
    this.getallcourses();
  }
  getcoursecategories() {
    this.learnerservice.getcoursecategory(this.userDetailes.group_id).subscribe((result: any) => {
      this.categories = result.data.get_all_category.message;
    });
  }
  onDisplayModeChange(mode: number): void {
    this.displayMode = mode;
  }
  getcoursesubcategories(category) {
    this.type = 'subcategory';
    const categoryid = category.category_id ? category.category_id : category.sub_category_id;
    this.learnerservice.getcoursesubcategory(categoryid).subscribe((result: any) => {
      this.subcategories = result.data.get_sub_category.message;
      this.getcourses(category);
    });
  }

  getcourses(category) {
    this.loader = true;
    category.type = this.type;
    category._id = category.category_id ? category.category_id : category.sub_category_id;
    category.pagenumber = this.pagenumber;
    this.learnerservice.getcourse(category).subscribe((result: any) => {
      this.allcourses = result.data.get_course_by_subcategory.message;
      this.loader = false;
    });
  }

  getallcourses() {
    if (this.userDetailes.group_id)
      this.learnerservice.getallcourses(this.userDetailes.group_id[0], this.pagenumber, this.sort_type).subscribe((result: any) => {
        this.allcourses = result.data.get_all_course_by_usergroup.message;
      });
  }

  onpagination(event) {
    this.paginationpgno = event;
    // console.log(event)
    this.pagenumber = this.pagenumber + 1;
    this.learnerservice.getallcourses('1', event - 1, this.sort_type).subscribe((result: any) => {
      this.allcourses.push(...result.data.get_all_course_by_usergroup.message);
    });
  }

  getCategory(templateRef: TemplateRef<any>) {
    this.showAppliedFiltre = false;
    this.dialog.open(templateRef);
  }
  closedialogbox() {
    this.dialog.closeAll();
    this.allLvlCategoryFilterVal = [];
    this.getthreeLevelCat();
  }

  getthreeLevelCat() {
    this.learnerservice.getLevelCategoryData().subscribe((result: any) => {
      this.allLvlCategory = result['data']['getLevelCategoryData']['data'];
    })
  }

  countUpdateInstructor(array) {
    if(this.guidelineSearchVal && this.guidelineSearchVal.author_data && array) {
    this.guidelineSearchVal.author_data.forEach(element => {
      array.forEach(element1 => {
        if (element.authordetails == element1.authordetails) {
          element1.checked = element.checked;
        }
      });
    })
  }
    this.guidelineSearchVal.author_data = array;
  }
  countUpdateLanguage(array) {  
    if(this.guidelineSearchVal && this.guidelineSearchVal.course_data && array) {
    this.guidelineSearchVal.course_data.forEach(element => {
      array.forEach(element1 => {
        if (element.course_language == element1.course_language) {
          element1.checked = element.checked;
        }
      });
    })
  }
    this.guidelineSearchVal.course_data = array;
  }
  countUpdatePartner(array) {
    if(this.guidelineSearchVal && this.guidelineSearchVal.coursepartner_data && array) {
    this.guidelineSearchVal.coursepartner_data.forEach(element => {
      array.forEach(element1 => {
        if (element.coursepartnerdetails == element1.coursepartnerdetails) {
          element1.checked = element.checked;
        }
      });
    })
  }
    this.guidelineSearchVal.coursepartner_data = array;
  }
  countUpdateCoursemode(array) {
    if(this.guidelineSearchVal && this.guidelineSearchVal.coursemode_data && array) {
    this.guidelineSearchVal.coursemode_data.forEach(element => {
      array.forEach(element1 => {
        if (element.course_mode == element1.course_mode) {
          element1.checked = element.checked;
        }
      });
    })
  }
    this.guidelineSearchVal.coursemode_data = array;
  }
 
}