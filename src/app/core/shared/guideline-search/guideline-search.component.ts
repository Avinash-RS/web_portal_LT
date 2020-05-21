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
  selector: 'app-guideline-search',
  templateUrl: './guideline-search.component.html',
  styleUrls: ['./guideline-search.component.scss']
})
export class GuidelineSearchComponent implements OnInit {
  selectedlang : any = [];
  coursepartners: any = [];
  coursemode :any = [];
  authordetails : any = [];
  selectedFilter: any = [];
  guidelineSearchVal: any = [];
  allLvlCategory: any;
  Lvl1CatId : any = [];
  Lvl2CatId : any = [];
  Lvl3CatId : any = [];
  pagenumber = 0;
  allcourses: any;
  showAppliedFiltre :boolean = false;

  constructor(public learnerservice: LearnerServicesService,  private alert: AlertServiceService,
    private dialog: MatDialog, private globalservice: GlobalServiceService,public CommonServices: CommonServicesService) { }

  ngOnInit() {
  }
//   filter(){
//     this.showAppliedFiltre = true;
//       this.learnerservice.getGuidelineSearch().subscribe((result : any)=>{
//          if(result['data']['getDetailsCount']['success'] == 'true'){
//           this.guidelineSearchVal = result['data']['getDetailsCount']['message'];
//           console.log('search', this.guidelineSearchVal);
//           if(this.guidelineSearchVal && this.guidelineSearchVal.course_data){
//             this.guidelineSearchVal.course_data.forEach(element => {
//               element.checked = false;
//             });
//           }
//           if(this.guidelineSearchVal && this.guidelineSearchVal.author_data){
//           this.guidelineSearchVal.author_data.forEach(element => {
//             element.checked = false;
//           });
//         }
//         if(this.guidelineSearchVal && this.guidelineSearchVal.coursemode_data){
//           this. guidelineSearchVal.coursemode_data.forEach(element => {
//             element.checked = false;
//           });
//         }
//         if(this.guidelineSearchVal && this.guidelineSearchVal.coursepartner_data){
//           this.guidelineSearchVal.coursepartner_data.forEach(element => {
//             element.checked = false;
//           });
//         }
//          }else{
//           //  this.alert.openAlert('Filter not found',null)
//          }
//       })
// }

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
    this.learnerservice.postGuildelineSearchData(this.Lvl1CatId, this.Lvl2CatId, this.Lvl3CatId, this.selectedlang, this.coursemode,
      this.authordetails, this.coursepartners, this.pagenumber, perPage).subscribe((result: any) => {
        this.allcourses = result['data']['getCourseCategorySearch']['data'];
      })
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
    this.learnerservice.postGuildelineSearchData(this.Lvl1CatId, this.Lvl2CatId, this.Lvl3CatId, this.selectedlang, this.coursemode,
      this.authordetails, this.coursepartners, this.pagenumber, perPage).subscribe((result: any) => {
        this.allcourses = result['data']['getCourseCategorySearch']['data'];
      })
  }
}
