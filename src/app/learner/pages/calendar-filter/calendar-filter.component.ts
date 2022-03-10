import { Component, OnInit } from '@angular/core';
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
  filterByvalue="";
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
  'course_id': 'All'
}]
activeMenu:any;    
  filterBy = [{
    'key': 'All Activities',
    'value': 'All'
  },
  {
    'key': 'Self Learning',
    'value': 'selfpacedlearning'
  },
  {
    'key': 'Live Interactions',
    'value': 'liveclassroom'
  },
  {
    'key': 'Assignment',
    'value': 'assignment'
  },
  {
    'key': 'Perform',
    'value': 'perform'
  },
  {
    'key': 'Project',
    'value': 'project'
  }
  ];
  constructor(
    private dialog: MatDialog,  
    public learnerService: LearnerServicesService
  ) {
    this.userDetails = JSON.parse(localStorage.getItem('UserDetails')) || JSON.parse(localStorage.getItem('UserDetails')) || null;
    this.getCourseData();
   }
     
  
  closeDialog(){
    this.dialog.closeAll();
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
  changefilterBy(value){
   this.filterMenu.forEach(element =>{
    if(element.key==value.key){
      element.active = true;

    }
    else{
      element.active = false;
    }
   });
   
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
          'course_id': 'All'
        })
        this.courseDetailsList.push(...this.enrolledCourses);
        this.courseDetailsList.some((item, idx) => 
        item.course_name == 'All Courses' && 
        this.courseDetailsList.unshift( 
          this.courseDetailsList.splice(idx,1)[0]))
      });
    });
  }


  ngOnInit() {
    this.activeMenu = this.filterMenu[0]
  }
  applyFilter(){
    
 
  }

}
