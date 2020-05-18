import { Component, OnInit ,TemplateRef} from '@angular/core';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { MatDialog } from '@angular/material';
import { CommonServicesService } from '@core/services/common-services.service';
import {SearchPipe} from '../../../pipes/search.pipe';
import { from } from 'rxjs';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { Options } from 'ng5-slider';
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
  masterSelected:boolean;
  checklist:any;
  checkedList:any = [];
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
  selectedFilter: any = [];

  commonCatIsSelectValue : any = [];
 lvl1selectedcat: any = [];
  constructor(public learnerservice: LearnerServicesService,  private alert: AlertServiceService,
     private dialog: MatDialog, private globalservice: GlobalServiceService,public CommonServices: CommonServicesService) {

    this.btnType = "Enroll Now"
    this.masterSelected = false;
    this.checklist = [
      {id:1,value:'Elenor Anderson',isSelected:false},
      {id:2,value:'Caden Kunze',isSelected:false},
      {id:3,value:'Ms. Hortense Zulauf',isSelected:false},
      {id:4,value:'Grady Reichert',isSelected:false},
      {id:5,value:'Dejon Olson',isSelected:false},
      {id:6,value:'Jamir Pfannerstill',isSelected:false},
      {id:7,value:'Aracely Renner DVM',isSelected:false},
      {id:8,value:'Genoveva Luettgen',isSelected:false},
      {id:5,value:'Dejon Olson',isSelected:false},
      {id:6,value:'Jamir Pfannerstill',isSelected:false},
      {id:7,value:'Aracely Renner DVM',isSelected:false},
      {id:8,value:'Genoveva Luettgen',isSelected:false}
    ];
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
      this.Lvl1CatId = this.Lvl1CatId.filter((item) => item.category_id !== category.category_id) 
      : this.Lvl1CatId.push(category);
      
    //   this.Lvl1CatId.forEach(element => {
    //     debugger
    //     if(element.isSelected === true)
    //     this.lvl1selectedcat.push(element.category_id);
    //   });
    //   console.log( this.Lvl1CatId)
    //  console.log( this.lvl1selectedcat)
    }else if (category.level == 2){
      this.isSelected(category)
      this.Lvl2CatId.find((item) => item.sub_category_id === category.sub_category_id) ? 
      this.Lvl2CatId = this.Lvl2CatId.filter((item) => item.sub_category_id !== category.sub_category_id) :
      this.Lvl2CatId.push(category);
      console.log( this.Lvl2CatId,' this.Lvl2CatId')
    }else{
      this.isSelected(category)
      this.Lvl3CatId.find((item) => item.super_sub_category_id === category.super_sub_category_id) ? 
      this.Lvl3CatId = this.Lvl3CatId.filter((item) => item.super_sub_category_id !== category.super_sub_category_id) :
      this.Lvl3CatId.push(category);
      console.log( this.Lvl3CatId,' this.Lvl3CatId')
    }
     this.learnerservice.getLevelSubCategoryData(this.Lvl1CatId,this.Lvl2CatId).subscribe((result: any) => {
      console.log(result)
      if(result['data']['getLevelSubCategoryData'].success == true){
        this.allLvlCategoryFilterVal = result['data']['getLevelSubCategoryData']['data'];
      }else{
        this.alert.openAlert('No Category Found',null)
      }
    });
  }

  getsubcatlevel(){
    
  }
 

  isAllSelected() {
    this.masterSelected =  this.Lvl1CatId.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.checklist.length; i++) {
      if(this.checklist[i].isSelected)
      this.checkedList.push(this.checklist[i]);
    }
  }

  checkedVal(event,val,type){
    if (event.target.checked) {
         if(type==='language') {
          this.selectedlang.push(val.course_language);
         }
       
         else if(type==='Instructor') {
          this.authordetails.push(val.authordetails);
         }
    
         else if(type==='courseMode') {
          this.coursemode.push(val.course_mode);
         }
       
        else if(type==='coursepartner') {
          this.coursepartners.push(val.coursepartnerdetails);
        }else{
          this.getallcourses();
        }
        
         var perPage = "10";
         this.pagenumber = 1;
         this.learnerservice.postGuildelineSearchData(this.Lvl1CatId,this.Lvl2CatId,this.Lvl3CatId,this.selectedlang,this.coursemode,
          this.authordetails,this.coursepartners,this.pagenumber,perPage).subscribe((result: any) => {
           this.allcourses = result['data']['getCourseCategorySearch']['data'];
           console.log( this.allcourses,'guildesearch')
         })
         } 
        // else{
        //   this.getallcourses();
        // }
        
        else {
            if(type==='language') {
               let index = this.selectedlang.indexOf(val.course_language);
           if (index > -1) {
             this.selectedlang.splice(index, 1);
           }
             }
             else if(type==='Instructor') {
          let index = this.authordetails.indexOf(val.authordetails);
           if (index > -1) {
             this.authordetails.splice(index, 1);
           }
             }
             else if(type==='courseMode') {
          let index = this.coursemode.indexOf(val.course_mode);
                 if (index > -1) {
                   this.coursemode.splice(index, 1);
                 }
             }
           
            else if(type==='coursepartner') {
          let index = this.coursepartners.indexOf(val.coursepartnerdetails);
                 if (index > -1) {
                   this.coursepartners.splice(index, 1);
                 }
            }
         }
    // else{
    //   this.getallcourses();
    // }
        // console.log('array',this.selectedFilter);
    this.selectedFilter = [];
    this.selectedFilter = this.selectedFilter.concat(this.selectedlang);
    this.selectedFilter = this.selectedFilter.concat(this.authordetails);
    this.selectedFilter = this.selectedFilter.concat(this.coursemode);
    this.selectedFilter = this.selectedFilter.concat(this.coursepartners);
      } 
  removeFilterVal(val,index){
    console.log(val,index)
    // console.log(val,'val')
    // this.selectedFilter = this.selectedFilter.splice(index);
    // console.log('after remove',this.selectedFilter)
    
  //   this.masterSelected = this.checklist.every(function(item:any) {
  //     console.log(item)
  //     return item.isSelected === false;
  //   })
  // this.getCheckedItemList();
    
  }
  clearAll(){
    // this.selectedFilter = [];
    console.log('cleared');
  }

  applyFilter(category) { 
    console.log(category)
    console.log(this.Lvl1CatId)
    console.log(this.Lvl2CatId)
    console.log(this.Lvl3CatId)
    console.log(this.pagenumber)
    var perPage = "10";
    // this.learnerservice.postGuildelineSearchData(this.Lvl1CatId,this.Lvl2CatId,this.Lvl3CatId,this.pagenumber,perPage).subscribe((result: any) => {
    //   console.log(result)
    // })
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
    this.getCheckedItemList();
  
  }

  filter(){
      this.showAppliedFiltre = true;
        this.learnerservice.getGuidelineSearch().subscribe((result : any)=>{
           console.log(result)
           if(result['data']['getDetailsCount']['success'] == 'true'){
            this.guidelineSearchVal = result['data']['getDetailsCount']['message'];
            console.log(this.guidelineSearchVal)
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
    console.log(this.userDetailes.group_id[0])
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
