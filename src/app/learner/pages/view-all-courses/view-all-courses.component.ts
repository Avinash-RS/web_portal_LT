import { Component, OnInit, TemplateRef } from '@angular/core';
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
  selector: 'app-view-all-courses',
  templateUrl: './view-all-courses.component.html',
  styleUrls: ['./view-all-courses.component.scss']
})
export class ViewAllCoursesComponent implements OnInit {
  TodateOptions: { dateFormat: string; disableSince: { year: number; month: number; day: number; }; };
  FromdateOptions: {
    dateFormat: string; disableUntil: { year: number; month: number; day: number; };
    disableSince: { year: number; month: number; day: number; };
  };
  courseName: string;
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
  authorPageNo = 0;
  authorPerPage = 5;
  course_languagePageNo = 0;
  course_languagePerPage = 5;
  course_modePageNo = 0;
  course_modePerPage = 5;
  coursepartnerPageno = 0;
  coursepartnerPerPage = 5;

  constructor(public learnerservice: LearnerServicesService, private alert: AlertServiceService,
    private dialog: MatDialog, private globalservice: GlobalServiceService, public CommonServices: CommonServicesService) {
    this.btnType = "Enroll Now"
  }

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


    var perPage = "10";
    this.learnerservice.postGuildelineSearchData(this.Lvl1CatId, this.Lvl2CatId, this.Lvl3CatId, this.selectedlang, this.coursemode,
      this.authorDetails, this.coursepartners, this.pagenumber, perPage, this.publishedToDate, this.publishedFromDate).subscribe((result: any) => {
        this.allcourses = result['data']['getCourseCategorySearch']['data'];
        this.countUpdateInstructor(result['data']['getCourseCategorySearch']['instructor'])
        this.countUpdateLanguage(result['data']['getCourseCategorySearch']['languageCount'])
        this.countUpdatePartner(result['data']['getCourseCategorySearch']['partner'])
        this.countUpdateCoursemode(result['data']['getCourseCategorySearch']['courseMode'])
      })
    this.selectedFilter.filterVal = [];
    this.selectedFilter.filterVal = this.selectedFilter.filterVal.concat(this.selectedlang);
    this.selectedFilter.filterVal = this.selectedFilter.filterVal.concat(this.authorDetails);
    this.selectedFilter.filterVal = this.selectedFilter.filterVal.concat(this.coursemode);
    this.selectedFilter.filterVal = this.selectedFilter.filterVal.concat(this.coursepartners);
  }
  removeFilterVal(val) {
    let langIndex = this.selectedlang.indexOf(val);
    let authorIndex = this.authorDetails.indexOf(val);
    let coursepartnersIndex = this.coursepartners.indexOf(val);
    let coursemodeIndex = this.coursemode.indexOf(val);
    // let cat1Index = this.allLvlCategoryFilterVal.level1.indexOf(val);
    // let cat2Index = this.allLvlCategoryFilterVal.level2.indexOf(val);
    // let cat3Index = this.allLvlCategoryFilterVal.level3.indexOf(val);

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
    // else if (cat1Index > -1) {
    //   this.allLvlCategoryFilterVal.level1.splice(cat1Index, 1);
    //   this.allLvlCategoryFilterVal.level1.forEach(element => {
    //     if (element.category_name === val) {
    //       element.checked = false;
    //     }
    //   });
    // }
    this.selectedFilter.filterVal = [];
    this.selectedFilter.filterVal = this.selectedFilter.filterVal.concat(this.selectedlang);
    this.selectedFilter.filterVal = this.selectedFilter.filterVal.concat(this.authorDetails);
    this.selectedFilter.filterVal = this.selectedFilter.filterVal.concat(this.coursemode);
    this.selectedFilter.filterVal = this.selectedFilter.filterVal.concat(this.coursepartners);

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
    this.getthreeLevelCat();
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
    var perPage = "10";
    this.learnerservice.postGuildelineSearchData(this.Lvl1CatId, this.Lvl2CatId, this.Lvl3CatId, this.selectedlang, this.coursemode,
      this.authorDetails, this.coursepartners, this.pagenumber, perPage, this.publishedToDate, this.publishedFromDate).subscribe((result: any) => {
        this.allcourses = result['data']['getCourseCategorySearch']['data'];
        this.countUpdateInstructor(result['data']['getCourseCategorySearch']['instructor'])
        this.countUpdateLanguage(result['data']['getCourseCategorySearch']['languageCount'])
        this.countUpdatePartner(result['data']['getCourseCategorySearch']['partner'])
        this.countUpdateCoursemode(result['data']['getCourseCategorySearch']['courseMode'])
        this.filterReset();
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
      })
    }
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
    this.pagenumber = this.pagenumber + 1;
    this.learnerservice.getallcourses('1', this.pagenumber, this.sort_type).subscribe((result: any) => {
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
  }

  countUpdateInstructor(array) {
    this.guidelineSearchVal.author_data.forEach(element => {
      array.forEach(element1 => {
        if (element.authordetails == element1.authordetails) {
          element1.checked = element.checked;
        }
      });
    })
    this.guidelineSearchVal.author_data = array;
  }
  countUpdateLanguage(array) {
    this.guidelineSearchVal.course_data.forEach(element => {
      array.forEach(element1 => {
        if (element.course_language == element1.course_language) {
          element1.checked = element.checked;
        }
      });
    })
    this.guidelineSearchVal.course_data = array;
  }
  countUpdatePartner(array) {
    this.guidelineSearchVal.coursepartner_data.forEach(element => {
      array.forEach(element1 => {
        if (element.coursepartnerdetails == element1.coursepartnerdetails) {
          element1.checked = element.checked;
        }
      });
    })
    this.guidelineSearchVal.coursepartner_data = array;
  }
  countUpdateCoursemode(array) {
    this.guidelineSearchVal.coursemode_data.forEach(element => {
      array.forEach(element1 => {
        if (element.course_mode == element1.course_mode) {
          element1.checked = element.checked;
        }
      });
    })
    this.guidelineSearchVal.coursemode_data = array;
  }
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
}