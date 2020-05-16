import { Component, OnInit ,TemplateRef} from '@angular/core';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { MatDialog } from '@angular/material';
import { CommonServicesService } from '@core/services/common-services.service';
declare var $: any;

@Component({
  selector: 'app-view-all-courses',
  templateUrl: './view-all-courses.component.html',
  styleUrls: ['./view-all-courses.component.scss']
})
export class ViewAllCoursesComponent implements OnInit {
  
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
  checkedList:any;
  sort_type:any = "A-Z";
  showAppliedFiltre :boolean = false;

  constructor(public learnerservice: LearnerServicesService, private dialog: MatDialog, 
    private globalservice: GlobalServiceService, public CommonServices: CommonServicesService) {
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


  isAllSelected() {
    this.masterSelected = this.checklist.every(function(item:any) {
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
    this.checkedList = JSON.stringify(this.checkedList);
    console.log(this.checkedList)
  }


  applyFilter() { 

   }

  ngOnInit() {
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
      // this.allcourses = result.data.get_a
      this.loader = false;
    });
  }

  getallcourses() {
    if (this.userDetailes.group_id)
    console.log(this.userDetailes.group_id[0])
    this.learnerservice.getallcourses(this.userDetailes.group_id[0],this.pagenumber,this.sort_type).subscribe((result: any) => {
      this.allcourses = result.data.get_all_course_by_usergroup.message;
      console.log(this.allcourses)
    });
  }

  // test() {
  //   $('.option__button').on('click', function () {
  //     $('.option__button').removeClass('selected');
  //     $(this).addClass('selected');
  //     if ($(this).hasClass('option--grid')) {
  //       $('.results-section').attr('class', 'results-section results--grid');
  //     } else if ($(this).hasClass('option--list')) {
  //       $('.results-section').attr('class', 'results-section results--list');
  //     }
  //   });
  // }
  /**
   * Determines whether scroll down on
   */
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
}
