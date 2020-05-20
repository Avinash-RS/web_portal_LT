import { Component, OnInit ,TemplateRef} from '@angular/core';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { MatDialog } from '@angular/material';
import { CommonServicesService } from '@core/services/common-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { Options } from 'ng5-slider';
import * as _ from 'lodash';
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
  sort_type:any = "A-Z";
  showAppliedFiltre :boolean = false;
  errormsg:boolean = false;
  allLvlCategory: any;
  Lvl1CatId : any = [];
  Lvl2CatId : any = [];
  Lvl3CatId : any = [];
  guidelineSearchVal: any = [];
  allLvlCategoryFilterVal : any = [];
  selectedlang : any = [];
  coursepartners: any = [];
  coursemode :any = [];
  authordetails : any = [];
  level1selectedID: any = [];
  level2selectedID: any = [];
  level3selectedID: any = [];
  selectedFilter: any = [];
  constructor(public learnerservice: LearnerServicesService,  private alert: AlertServiceService,
     private dialog: MatDialog, private globalservice: GlobalServiceService,public CommonServices: CommonServicesService) {
    this.btnType = "Enroll Now"
  }

  ngOnInit() {
    this.getthreeLevelCat();
    this.userDetailes = this.globalservice.checkLogout();
    if (!this.userDetailes.group_id) {
      this.userDetailes.group_id = '1';
    }
    this.CommonServices.globalSearch.subscribe((data: any) => {
      if(data.length > 0) {
        this.allcourses = data;
      } else {
        this.ngOnInit();
      }
    })
    this.loadcategoryandcourses();
  }


  isSelected(s:any) {
    if(s.level == 1){
      return this.Lvl1CatId.findIndex((item) => item.category_id === s.category_id) > -1 ? true : false;
    }else if (s.level == 2){
      return this.Lvl2CatId.findIndex((item) => item.sub_category_id === s.sub_category_id) > -1 ? true : false;
    }else{
      return this.Lvl3CatId.findIndex((item) => item.super_sub_category_id === s.super_sub_category_id) > -1 ? true : false;
    }
   }
 
  getCategoryId(category){
    if(category.level == 1){
      this.isSelected(category)
      this.Lvl1CatId.find((item) => item.category_id === category.category_id) ? 
      this.Lvl1CatId = this.Lvl1CatId.filter((item) => item.category_id !== category.category_id) : this.Lvl1CatId.push(category);
      this.level1selectedID = this.Lvl1CatId.flatMap(i => i.category_id)
    }else if (category.level == 2){
      this.isSelected(category)
      this.Lvl2CatId.find((item) => item.sub_category_id === category.sub_category_id) ? this.Lvl2CatId = this.Lvl2CatId.filter((item) => item.sub_category_id !== category.sub_category_id) : this.Lvl2CatId.push(category);
      this.level2selectedID = this.Lvl2CatId.flatMap(i => i.sub_category_id)
    }else if ((category.level == 3)){
      this.isSelected(category)
      this.Lvl3CatId.find((item) => item.super_sub_category_id === category.super_sub_category_id) ? this.Lvl3CatId = this.Lvl3CatId.filter((item) => item.super_sub_category_id !== category.super_sub_category_id) : this.Lvl3CatId.push(category);
      this.level3selectedID = this.Lvl3CatId.flatMap(i => i.super_sub_category_id)
    }else{
      this. getthreeLevelCat();
    }

    this.learnerservice.getLevelSubCategoryData(this.level1selectedID,this.level2selectedID,this.level3selectedID).subscribe((result: any) => {
      if(result['data']['getLevelSubCategoryData'].success == true){
        this.allLvlCategoryFilterVal = result['data']['getLevelSubCategoryData']['data'];
      }
    });
  }




  checkedVal(event,val,type){
    if (event.target.checked) {
      if (type === 'language') {
        this.selectedlang.push(val.course_language);
        this.guidelineSearchVal.course_data.forEach(element => {
          if(element.course_language === val.course_language){
            element.checked = true;
          }
        });
      } else if (type === 'Instructor') {
        this.authordetails.push(val.authordetails);
        this.guidelineSearchVal.author_data.forEach(element => {
          if(element.authordetails === val.authordetails){
            element.checked = true;
          }
        });
      } else if (type === 'courseMode') {
        this.coursemode.push(val.course_mode);
        this.guidelineSearchVal.coursemode_data.forEach(element => {
          if(element.course_mode === val.course_mode){
            element.checked = true;
          }
        });
      } else if (type === 'coursepartner') {
        this.coursepartners.push(val.coursepartnerdetails);
        this.guidelineSearchVal.coursepartner_data.forEach(element => {
          if(element.coursepartnerdetails === val.coursepartnerdetails){
            element.checked = true;
          }
        });
      }
    }
    else if (!event.target.checked) {
      if (type === 'language') {
        let index = this.selectedlang.indexOf(val.course_language);
        if (index > -1) {
          this.selectedlang.splice(index, 1);
        }
        this.guidelineSearchVal.course_data.forEach(element => {
          if(element.course_language === val.course_language){
            element.checked = false;
          }
        });
      }
      else if (type === 'Instructor') {
        let index = this.authordetails.indexOf(val.authordetails);
        if (index > -1) {
          this.authordetails.splice(index, 1);
        }
        this.guidelineSearchVal.author_data.forEach(element => {
          if(element.authordetails === val.authordetails){
            element.checked = false;
          }
        });
      }
      else if (type === 'courseMode') {
        let index = this.coursemode.indexOf(val.course_mode);
        if (index > -1) {
          this.coursemode.splice(index, 1);
        }
        this.guidelineSearchVal.coursemode_data.forEach(element => {
          if(element.course_mode === val.course_mode){
            element.checked = false;
          }
        });
      }
      else if (type === 'coursepartner') {
        let index = this.coursepartners.indexOf(val.coursepartnerdetails);
        if (index > -1) {
          this.coursepartners.splice(index, 1);
        }
        this.guidelineSearchVal.coursepartner_data.forEach(element => {
          if(element.coursepartnerdetails === val.coursepartnerdetails){
            element.checked = false;
          }
        });
      }
    }


    var perPage = "10";
    this.pagenumber = 0;
    this.learnerservice.postGuildelineSearchData(this.Lvl1CatId, this.Lvl2CatId, this.Lvl3CatId, this.selectedlang, this.coursemode,
      this.authordetails, this.coursepartners, this.pagenumber, perPage).subscribe((result: any) => {
        this.allcourses = result['data']['getCourseCategorySearch']['data'];
      })
    this.selectedFilter = [];
    this.selectedFilter = this.selectedFilter.concat(this.selectedlang);
    this.selectedFilter = this.selectedFilter.concat(this.authordetails);
    this.selectedFilter = this.selectedFilter.concat(this.coursemode);
    this.selectedFilter = this.selectedFilter.concat(this.coursepartners);
      } 
  removeFilterVal(val){
    let langIndex = this.selectedlang.indexOf(val);
    let authorIndex = this.authordetails.indexOf(val);
    let coursepartnersIndex = this.coursepartners.indexOf(val);
    let coursemodeIndex = this.coursemode.indexOf(val);

    if (langIndex > -1) {
      this.selectedlang.splice(langIndex, 1);
      this.guidelineSearchVal.course_data.forEach(element => {
        if(element.course_language === val){
          element.checked = false;
        }
      });
    }

    else if (authorIndex > -1) {
      this.authordetails.splice(authorIndex, 1);
      this.guidelineSearchVal.author_data.forEach(element => {
        if(element.authordetails === val){
          element.checked = false;
        }
      });
    }
    else if (coursepartnersIndex > -1) {
      this.coursepartners.splice(coursepartnersIndex, 1);
      this.guidelineSearchVal.coursepartner_data.forEach(element => {
        if(element.coursepartnerdetails === val){
          element.checked = false;
        }
      });
    }
    else if (coursemodeIndex > -1) {
      this.coursemode.splice(coursemodeIndex, 1);
      this.guidelineSearchVal.coursemode_data.forEach(element => {
        if(element.course_mode === val){
          element.checked = false;
        }
      });
    }
    this.selectedFilter = [];
    this.selectedFilter = this.selectedFilter.concat(this.selectedlang);
    this.selectedFilter = this.selectedFilter.concat(this.authordetails);
    this.selectedFilter = this.selectedFilter.concat(this.coursemode);
    this.selectedFilter = this.selectedFilter.concat(this.coursepartners); 

    var perPage = "10";
    this.pagenumber = 1;
    this.learnerservice.postGuildelineSearchData(this.Lvl1CatId, this.Lvl2CatId, this.Lvl3CatId, this.selectedlang, this.coursemode,
      this.authordetails, this.coursepartners, this.pagenumber, perPage).subscribe((result: any) => {
        this.allcourses = result['data']['getCourseCategorySearch']['data'];
      })
  }
  clearAll(){
    this.selectedFilter = [];
    this.selectedlang = [];
    this.authordetails = [];
    this.coursemode = [];
    this.coursepartners = [];
    if(this.guidelineSearchVal && this.guidelineSearchVal.course_data){
      this.guidelineSearchVal.course_data.forEach(element => {
        element.checked = false;
      });
    }
    if(this.guidelineSearchVal && this.guidelineSearchVal.author_data){
      this.guidelineSearchVal.author_data.forEach(element => {
        element.checked = false;
      });
    }
    if(this.guidelineSearchVal && this.guidelineSearchVal.coursemode_data){
      this.guidelineSearchVal.coursemode_data.forEach(element => {
        element.checked = false;
      });
    }
    if(this.guidelineSearchVal && this.guidelineSearchVal.coursepartner_data){
      this.guidelineSearchVal.coursepartner_data.forEach(element => {
        element.checked = false;
      });
    }
    var perPage = "10";
    this.pagenumber = 1;
    this.learnerservice.postGuildelineSearchData(this.Lvl1CatId, this.Lvl2CatId, this.Lvl3CatId, this.selectedlang, this.coursemode,
      this.authordetails, this.coursepartners, this.pagenumber, perPage).subscribe((result: any) => {
        this.allcourses = result['data']['getCourseCategorySearch']['data'];
      })
  }

  applyFilter(category) { 
    var perPage = "10";
    this.learnerservice.postGuildelineSearchData(this.level1selectedID,this.level2selectedID,this.level3selectedID,this.selectedlang,this.coursemode,
      this.authordetails,this.coursepartners,this.pagenumber,perPage).subscribe((result: any) => {
        if(result['data']['getCourseCategorySearch'].success == true)
        this.allcourses = result['data']['getCourseCategorySearch']['data'];
        this.dialog.closeAll();
    })
   }


  filter(){
      this.showAppliedFiltre = true;
        this.learnerservice.getGuidelineSearch().subscribe((result : any)=>{
           if(result['data']['getDetailsCount']['success'] == 'true'){
            this.guidelineSearchVal = result['data']['getDetailsCount']['message'];
            if(this.guidelineSearchVal && this.guidelineSearchVal.course_data){
              this.guidelineSearchVal.course_data.forEach(element => {
                element.checked = false;
              });
            }
            if(this.guidelineSearchVal && this.guidelineSearchVal.author_data){
            this.guidelineSearchVal.author_data.forEach(element => {
              element.checked = false;
            });
          }
          if(this.guidelineSearchVal && this.guidelineSearchVal.coursemode_data){
            this. guidelineSearchVal.coursemode_data.forEach(element => {
              element.checked = false;
            });
          }
          if(this.guidelineSearchVal && this.guidelineSearchVal.coursepartner_data){
            this.guidelineSearchVal.coursepartner_data.forEach(element => {
              element.checked = false;
            });
          }
           }else{
            //  this.alert.openAlert('Filter not found',null)
           }
        })
  }

  sorting(sortval){
    this.showAppliedFiltre = false;
    if (this.userDetailes.group_id)
      this.learnerservice.getallcourses(this.userDetailes.group_id[0],this.pagenumber,sortval).subscribe((result: any) => {
        this.allcourses = result.data.get_all_course_by_usergroup.message;
      });
  }

  loadcategoryandcourses() {
    this.type = 'category';
    this.pagenumber = 0;
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
    this.pagenumber = 0;
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
    this.learnerservice.getallcourses(this.userDetailes.group_id[0],this.pagenumber,this.sort_type).subscribe((result: any) => {
    this.allcourses = result.data.get_all_course_by_usergroup.message;
    });
  }

  onpagination(event) {
    this.paginationpgno = event;
    this.pagenumber = this.pagenumber + 1;
    this.learnerservice.getallcourses('1', this.pagenumber,this.sort_type).subscribe((result: any) => {
      this.allcourses.push(...result.data.get_all_course_by_usergroup.message);
    });
  }

  getCategory(templateRef: TemplateRef<any>) {
    this.showAppliedFiltre = false;
    this.dialog.open(templateRef);
  }
  closedialogbox(){
    this.dialog.closeAll();
  }

  getthreeLevelCat(){
    this.learnerservice.getLevelCategoryData().subscribe((result: any) => {
      this.allLvlCategory = result['data']['getLevelCategoryData']['data']; 
    })
  }
}
