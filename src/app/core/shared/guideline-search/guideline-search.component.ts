import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { MatDialog } from '@angular/material';
import { CommonServicesService } from '@core/services/common-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { Options } from 'ng5-slider';
import * as _ from 'lodash';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-guideline-search',
  templateUrl: './guideline-search.component.html',
  styleUrls: ['./guideline-search.component.scss']
})
export class GuidelineSearchComponent implements OnInit {
  @Input('showAppliedFiltre') showAppliedFiltre : boolean;
  TodateOptions: { dateFormat: string; disableSince: { year: number; month: number; day: number; }; };
  FromdateOptions: {
    dateFormat: string; disableUntil: { year: number; month: number; day: number; };
    disableSince: { year: number; month: number; day: number; };
  };
  get tomorrowDate(): Date {
    const todayDate = new Date();
    const tomorrowDate = new Date(todayDate.getTime() + 24 * 60 * 60 * 1000);

    return tomorrowDate;
  }
  value: number = 0;
  highValue: number = 20;
  options: Options = {
    floor: 2,
    ceil: 24
  };
  selectedlang: any = [];
  coursepartners: any = [];
  coursemode: any = [];
  authorDetails: any = [];
  selectedFilter: any = [];
  guidelineSearchVal: any = [];
  allLvlCategory: any;
  Lvl1CatId: any = [];
  Lvl2CatId: any = [];
  Lvl3CatId: any = [];
  pagenumber = 0;
  allcourses: any;
  // showAppliedFiltre: boolean = false;
  authorPageNo = 0;
  authorPerPage = 5;
  course_languagePageNo = 0;
  course_languagePerPage = 5;
  course_modePageNo = 0;
  course_modePerPage = 5;
  coursepartnerPageno = 0;
  coursepartnerPerPage = 5;
  publishedToDate: String;
  publishedFromDate: String;
  level1selectedID: any = [];
  level2selectedID: any = [];
  level3selectedID: any = [];
  allLvlCategoryFilterVal: any = [];

  constructor(public learnerservice: LearnerServicesService, private alert: AlertServiceService,
    private dialog: MatDialog, private globalservice: GlobalServiceService, public CommonServices: CommonServicesService) { }

  ngOnInit() {
    this.TodateOptions = {
      dateFormat: 'yyyy-mm-dd',
      disableSince: {
        year: this.tomorrowDate.getFullYear(), month: this.tomorrowDate.getMonth() + 1, day: this.tomorrowDate.getDate()
      }
    }
    this.FromdateOptions = {
      dateFormat: 'yyyy-mm-dd',
      disableSince: { year: this.tomorrowDate.getFullYear(), month: this.tomorrowDate.getMonth() + 1, day: this.tomorrowDate.getDate() },
      disableUntil: { year: 2020, month: 3, day: 31 }
    }
    this.CommonServices.selectedCategory.subscribe(data => {
      this.Lvl1CatId = data.Lvl1CatId,
      this.level1selectedID = data.level1selectedID,
      this.Lvl2CatId= data.Lvl2CatId,
      this.level2selectedID = data.level2selectedID,
      this.Lvl3CatId= data.Lvl3CatId,
      this.level3selectedID = data.level3selectedID,
      this.allLvlCategoryFilterVal=data.allLvlCategoryFilterVal,
      this.allLvlCategory=data.allLvlCategory 
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
      })
    }
  }
 
  //Show more in filter
  showmore(val) {
    if (val == 'author') {
      this.authorPerPage += 5;
    }
    else if (val == 'course_language') {
      this.course_languagePerPage += 5;
    }
    else if (val == 'course_mode') {
      this.course_modePerPage += 5;
    }
    else if (val == 'coursepartner') {
      this.coursepartnerPerPage += 5;
    }
  }

  checkedVal(event, val, type) {
    if (event.target.checked) {
      if (type === 'language') {
        this.selectedlang.push(val.course_language);
        this.guidelineSearchVal.course_data.forEach(element => {
          if (element.course_language === val.course_language) {
            element.checked = true;
          }
        });
      } else if (type === 'Instructor') {
        this.authorDetails.push(val.authordetails);
        this.guidelineSearchVal.author_data.forEach(element => {
          if (element.authordetails === val.authordetails) {
            element.checked = true;
          }
        });
      } else if (type === 'courseMode') {
        this.coursemode.push(val.course_mode);
        this.guidelineSearchVal.coursemode_data.forEach(element => {
          if (element.course_mode === val.course_mode) {
            element.checked = true;
          }
        });
      } else if (type === 'coursepartner') {
        this.coursepartners.push(val.coursepartnerdetails);
        this.guidelineSearchVal.coursepartner_data.forEach(element => {
          if (element.coursepartnerdetails === val.coursepartnerdetails) {
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
          if (element.course_language === val.course_language) {
            element.checked = false;
          }
        });
      }
      else if (type === 'Instructor') {
        let index = this.authorDetails.indexOf(val.authordetails);
        if (index > -1) {
          this.authorDetails.splice(index, 1);
        }
        this.guidelineSearchVal.author_data.forEach(element => {
          if (element.authordetails === val.authordetails) {
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
          if (element.course_mode === val.course_mode) {
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
          if (element.coursepartnerdetails === val.coursepartnerdetails) {
            element.checked = false;
          }
        });
      }
    }


    var perPage = "20";
    this.learnerservice.postGuildelineSearchData(this.Lvl1CatId, this.Lvl2CatId, this.Lvl3CatId, this.selectedlang, this.coursemode,
      this.authorDetails, this.coursepartners, this.pagenumber, perPage, this.publishedToDate, this.publishedFromDate).subscribe((result: any) => {
        this.allcourses = result['data']['getCourseCategorySearch']['data'];
        this.countUpdateInstructor(result['data']['getCourseCategorySearch']['instructor'])
        this.countUpdateLanguage(result['data']['getCourseCategorySearch']['languageCount'])
        this.countUpdatePartner(result['data']['getCourseCategorySearch']['partner'])
        this.countUpdateCoursemode(result['data']['getCourseCategorySearch']['courseMode'])
        this.CommonServices.globalCourses$.next(this.allcourses);
      })
    this.selectedFilter.filterVal = [];
    this.selectedFilter.filterVal = this.selectedFilter.filterVal.concat(this.selectedlang);
    this.selectedFilter.filterVal = this.selectedFilter.filterVal.concat(this.authorDetails);
    this.selectedFilter.filterVal = this.selectedFilter.filterVal.concat(this.coursemode);
    this.selectedFilter.filterVal = this.selectedFilter.filterVal.concat(this.coursepartners);

  }
  countUpdateInstructor(array) {
    if (this.guidelineSearchVal && this.guidelineSearchVal.author_data && array) {
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
    if (this.guidelineSearchVal && this.guidelineSearchVal.course_data && array) {
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
    if (this.guidelineSearchVal && this.guidelineSearchVal.coursepartner_data && array) {
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
    if (this.guidelineSearchVal && this.guidelineSearchVal.coursemode_data && array) {
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
  //Date
  onDateChanged(event, name) {
    if (name === 'fromdate') {
      this.publishedFromDate = event.formatted;
    }
    if (name === 'todate') {
      this.publishedToDate = event.formatted;
    }
    if (this.publishedFromDate != '' && this.publishedToDate != '' && this.publishedFromDate > this.publishedToDate) {
      Swal.fire('From date should not be greater than To date');
    }
    else {
      var perPage = "20";
      this.learnerservice.postGuildelineSearchData(this.Lvl1CatId, this.Lvl2CatId, this.Lvl3CatId, this.selectedlang, this.coursemode,
        this.authorDetails, this.coursepartners, this.pagenumber, perPage, this.publishedToDate, this.publishedFromDate).subscribe((result: any) => {
          this.allcourses = result['data']['getCourseCategorySearch']['data'];
          this.countUpdateInstructor(result['data']['getCourseCategorySearch']['instructor'])
          this.countUpdateLanguage(result['data']['getCourseCategorySearch']['languageCount'])
          this.countUpdatePartner(result['data']['getCourseCategorySearch']['partner'])
          this.countUpdateCoursemode(result['data']['getCourseCategorySearch']['courseMode'])
          this.CommonServices.globalCourses$.next(this.allcourses);
        })
    }
  }
  //Remove filter
  removeFilterVal(val) {
    let langIndex = this.selectedlang.indexOf(val);
    let authorIndex = this.authorDetails.indexOf(val);
    let coursepartnersIndex = this.coursepartners.indexOf(val);
    let coursemodeIndex = this.coursemode.indexOf(val);

    if (langIndex > -1) {
      this.selectedlang.splice(langIndex, 1);
      this.guidelineSearchVal.course_data.forEach(element => {
        if (element.course_language === val) {
          element.checked = false;
        }
      });
    }

    else if (authorIndex > -1) {
      this.authorDetails.splice(authorIndex, 1);
      this.guidelineSearchVal.author_data.forEach(element => {
        if (element.authordetails === val) {
          element.checked = false;
        }
      });
    }
    else if (coursepartnersIndex > -1) {
      this.coursepartners.splice(coursepartnersIndex, 1);
      this.guidelineSearchVal.coursepartner_data.forEach(element => {
        if (element.coursepartnerdetails === val) {
          element.checked = false;
        }
      });
    }
    else if (coursemodeIndex > -1) {
      this.coursemode.splice(coursemodeIndex, 1);
      this.guidelineSearchVal.coursemode_data.forEach(element => {
        if (element.course_mode === val) {
          element.checked = false;
        }
      });
    }

    this.selectedFilter.filterVal = [];
    this.selectedFilter.filterVal = this.selectedFilter.filterVal.concat(this.selectedlang);
    this.selectedFilter.filterVal = this.selectedFilter.filterVal.concat(this.authorDetails);
    this.selectedFilter.filterVal = this.selectedFilter.filterVal.concat(this.coursemode);
    this.selectedFilter.filterVal = this.selectedFilter.filterVal.concat(this.coursepartners);

    var perPage = "20";
    this.learnerservice.postGuildelineSearchData(this.Lvl1CatId, this.Lvl2CatId, this.Lvl3CatId, this.selectedlang, this.coursemode,
      this.authorDetails, this.coursepartners, this.pagenumber, perPage, this.publishedToDate, this.publishedFromDate).subscribe((result: any) => {
        this.allcourses = result['data']['getCourseCategorySearch']['data'];
        this.countUpdateInstructor(result['data']['getCourseCategorySearch']['instructor'])
        this.countUpdateLanguage(result['data']['getCourseCategorySearch']['languageCount'])
        this.countUpdatePartner(result['data']['getCourseCategorySearch']['partner'])
        this.countUpdateCoursemode(result['data']['getCourseCategorySearch']['courseMode'])
        this.CommonServices.globalCourses$.next(this.allcourses);
      })
  }
  //Clearing Filter
  clearAll() {
    this.selectedFilter = [];
    this.selectedlang = [];
    this.authorDetails = [];
    this.coursemode = [];
    this.coursepartners = [];
    // ==============
    this.level1selectedID = []
    this.level2selectedID = []
    this.level3selectedID = []
    this.Lvl1CatId = [];
    this.Lvl2CatId = [];
    this.Lvl3CatId = [];
    this.allLvlCategory = [];
    this.allLvlCategoryFilterVal = [];
    this.CommonServices.globalFilterCategory$.next(this.allLvlCategoryFilterVal);

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
    var perPage = "20";
    this.learnerservice.postGuildelineSearchData(this.Lvl1CatId, this.Lvl2CatId, this.Lvl3CatId, this.selectedlang, this.coursemode,
      this.authorDetails, this.coursepartners, this.pagenumber, perPage, this.publishedToDate, this.publishedFromDate).subscribe((result: any) => {
        this.allcourses = result['data']['getCourseCategorySearch']['data'];
        this.countUpdateInstructor(result['data']['getCourseCategorySearch']['instructor'])
        this.countUpdateLanguage(result['data']['getCourseCategorySearch']['languageCount'])
        this.countUpdatePartner(result['data']['getCourseCategorySearch']['partner'])
        this.countUpdateCoursemode(result['data']['getCourseCategorySearch']['courseMode'])
        this.CommonServices.globalCourses$.next(this.allcourses);
        this.filterReset();
      })
  }
  filterReset() {
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
    })
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
    let obj = {
      Lvl1CatId: this.Lvl1CatId,
      level1selectedID : this.level1selectedID,
      Lvl2CatId: this.Lvl2CatId,
      level2selectedID : this.level2selectedID,
      Lvl3CatId: this.Lvl3CatId,
      level3selectedID : this.level3selectedID,
      allLvlCategoryFilterVal:this.allLvlCategoryFilterVal,
      allLvlCategory:this.allLvlCategory 
    }
    this.CommonServices.globalCategory$.next(obj);
  
    var perPage = "20";
    this.learnerservice.postGuildelineSearchData(this.Lvl1CatId, this.Lvl2CatId, this.Lvl3CatId, this.selectedlang, this.coursemode,
      this.authorDetails, this.coursepartners, this.pagenumber, perPage, this.publishedToDate, this.publishedFromDate).subscribe((result: any) => {
        this.allcourses = result['data']['getCourseCategorySearch']['data'];
        this.countUpdateInstructor(result['data']['getCourseCategorySearch']['instructor'])
        this.countUpdateLanguage(result['data']['getCourseCategorySearch']['languageCount'])
        this.countUpdatePartner(result['data']['getCourseCategorySearch']['partner'])
        this.countUpdateCoursemode(result['data']['getCourseCategorySearch']['courseMode'])
        this.CommonServices.globalCourses$.next(this.allcourses);
      })
  }


}
