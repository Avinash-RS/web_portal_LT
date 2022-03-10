import { Component, Inject, OnInit, Optional } from '@angular/core';
import { E } from '@angular/cdk/keycodes';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import el from 'date-fns/locale/el';
@Component({
  selector: 'app-calendar-filter',
  templateUrl: './calendar-filter.component.html',
  styleUrls: ['./calendar-filter.component.scss']
})
export class CalendarFilterComponent implements OnInit {
  userDetails;
  enrolledCourses;
  activityvalue ="";
  CourseValue ="";
  filterMenu =[
    {
      key:"Activities",
      active:true,
  }
    ,{
      key:"Course",
      active:false,
    }
   
];
courseDetailsList = [{
  'course_name': 'All Courses',
  'course_id': 'All',
  'active':false
}]
activeMenu:any;    
activities = [{
    'key': 'All Activities',
    'value': 'All',
    'active':false,
  },
  {
    'key': 'Self Learning',
    'value': 'selfpacedlearning',
    'active':false,
  },
  {
    'key': 'Live Interactions',
    'value': 'liveclassroom',
    'active':false,
  },
  {
    'key': 'Assignment',
    'value': 'assignment',
    'active':false,
  },
  {
    'key': 'Perform',
    'value': 'perform',
    'active':false,
  },
  {
    'key': 'Project',
    'value': 'project',
    'active':false,
  }
  ];

  constructor(
    public dialog: MatDialog,  
    public learnerService: LearnerServicesService,
    @Optional() public dialogRef: MatDialogRef<CalendarFilterComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public filteredData
  ) {
    this.userDetails = JSON.parse(localStorage.getItem('UserDetails')) || JSON.parse(localStorage.getItem('UserDetails')) || null;
    this.getCourseData();
   }
     
   ngOnInit() {
    this.activeMenu = this.filterMenu[0];
    this.retainActivityFilter();
  }
  
  getCourseData(){
    this.learnerService.get_batchwise_learner_dashboard_data(this.userDetails.user_id, 'all', null).subscribe((BcourseData: any) => {
      const tmpBcourseDetail = BcourseData.data.get_batchwise_learner_dashboard_data.message;
      this.courseDetailsList = tmpBcourseDetail && tmpBcourseDetail !== null ? tmpBcourseDetail : [];
      this.learnerService.getLearnerDashboard(this.userDetails.user_id, this.userDetails._id, 'undefined', 'all', 'enrolment').subscribe((EcourseData: any) => {
        const EcourseDetail = EcourseData.data.get_learner_dashboard.message.enrolled_course_details;
        this.enrolledCourses = EcourseDetail && EcourseDetail !== null ? EcourseDetail : [];
        this.courseDetailsList.push({
          'course_name': 'All Courses',
          'course_id': 'All',
          'active' :false
        })
        this.courseDetailsList.push(...this.enrolledCourses);
        this.courseDetailsList.some((item, idx) => 
        item.course_name == 'All Courses' && 
        this.courseDetailsList.unshift( 
          this.courseDetailsList.splice(idx,1)[0]))
          this.retainCourseFilter();
      });
    });
  }
  changeMenu(value){
    this.activeMenu = value;
    this.filterMenu.forEach(element => {
      if(element.key == value.key){
        element.active = true;
      }
      else{
        element.active = false;
      }
    });
  }
  activitiesFilter(value){
   this.activities.forEach(element =>{
    if(element.key==value.key){
      element.active = true;
      this.activityvalue = element.value;
    }
    else{
      element.active = false;
    }
   });
  }
  changecourseDetailsList(value){
    this.courseDetailsList.forEach(element =>{
      if(element.course_id == value.course_id){
        element.active = true;
        this.CourseValue = element.course_id;
      }
      else{
        element.active = false;
      }
    })
  }
  retainActivityFilter(){
    if(this.filteredData.activityValue && this.filteredData.activityValue !=''){
      this.activities.forEach(element =>{
        if(element.value ==this.filteredData.activityValue){
          element.active = true;
          this.activityvalue = element.value;
        }
        else{
          element.active = false;
        }
      });
    }
  }
  retainCourseFilter(){
    if(this.filteredData.courseValue && this.filteredData.courseValue !=''){
     this.courseDetailsList.forEach(element =>{
      if(element.course_id == this.filteredData.courseValue){
        element.active = true;
        this.CourseValue = element.course_id;
      }
      else{
        element.active = false;
      }
    });
  }
  }
  applyFilter(){
    const FilterValue ={
      activityValue:this.activityvalue,
      courseValue :this.CourseValue
    }
    this.dialogRef.close(FilterValue);
  }
  clearAll(){ 
    this.filteredData.activityValue ="All";
    this.filteredData.courseValue ="All";
    this.filterMenu = [{
      key:"Activities",
      active:true,
  }
    ,{
      key:"Course",
      active:false,
    }
   ];
   this.retainActivityFilter();
   this.retainCourseFilter();
  }

}
