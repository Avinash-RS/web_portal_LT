import { Component, OnInit, ViewChild } from '@angular/core';
import { Color, Label,MultiDataSet} from 'ng2-charts';
import { ChartDataSets, ChartOptions, } from 'chart.js';
import { Router } from '@angular/router';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
export interface PeriodicElement {

  courseName: string;
  position: number;
  category: string;
  subCategory: string;
  superSubCategory : string;
}


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  ELEMENT_DATA: PeriodicElement[] = [];
  jsonData =[]
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  displayedColumns: string[] = ['position', 'courseName', 'category', 'subCategory', 'superSubCategory'];
  // new register chart val
  public lineChartData: ChartDataSets[] = [{data: [], label: 'Series A' }];
  public lineChartLabels: Label[];
  public lineChartOptions: (ChartOptions) = {responsive: true};
  public lineChartColors: Color[] = [];
  public lineChartLegend = true;
  public lineChartType = "line";
  public lineChartPlugins = [];
// Active and inactive learner chart var
  public activeLearnerChartData: ChartDataSets[] = [];
  public activeLearnerChartLabels: Label[] = [];
  public activeLearnerChartOptions: (ChartOptions) = {responsive: true,};
  public activeLearnerChartColors: Color[] = [];

// Active InActive doughut Chart
public doughnutChartLabels: Label[] = [];
public doughnutChartData: MultiDataSet = [];
public doughnutChartType;

// Enrolled Course doughut Chart
public enrollCoursesLabel :  Label[] = [];
public enrollCoursesData: MultiDataSet = [];

// Student vs Professional line char
public stuVsProData: ChartDataSets[] = [];
public stuVsProLabels: Label[] = [];
public stuVsProOptions: (ChartOptions) = {responsive: true};
public stuVsProColors: Color[] = [];

// Total VS Active Learner
public totVsActLabels: Label[] = [];
public totVsActChartType = 'bar';
public totVsActChartLegend = true;
public totVsActChartPlugins = [];
public totVsActColors: Color[] = [];
public totVsActData: ChartDataSets[] = [{data: [], label: 'Series A' }];
public totVsActChartOptions: (ChartOptions) = {responsive: true};

//Login Per Day Chart
public loginperDayData: ChartDataSets[] = [{data: [], label: 'Series A' }];
public loginperDaChartLabels: Label[] = [];
public loginperDaChartOptions: (ChartOptions) = {responsive: true,};
public loginperDaChartColors: Color[] = [{borderColor: '#a28bf5', backgroundColor: 'rgba(255, 255, 255, .4)'}];
public loginperDaChartLegend = true;
public loginperDaChartType = 'line';
public loginperDaChartPlugins = [];
public isCollapsed = false;
public isCollapsed1 = false;
  days= [];
  activeLearnerisable : boolean = false;
  newRegisterIsable : boolean = true;
  availCoursesenable : boolean = false;
  istotenvEnable : boolean = false;
  islatestcoursesenable : boolean = true;
  islatestCouresEnable : boolean = false;
  isFreeCourseEnable : boolean = true;
  isEnrolledCoursesEnable : boolean = false;
  chartFilterdays: number = 7;
  newRegisterLearses : any = [];
  courseCount: any;
  getLoginsPerDay: any;
 
  constructor(public route: Router, private service: AdminServicesService,private alert: AlertServiceService,public spinner: NgxSpinnerService,) {
    this.days = [{
      id: 7, name: 'Last 7 days'},
      {id: 14, name: 'Last 14 days'},]
   }

    openNav() {
    document.getElementById("myNav").style.height = "100%";
  }
  
   closeNav() {
    document.getElementById("myNav").style.height = "0%";
  }

  ngOnInit() {
    this.newRegistrationsChart(this.chartFilterdays);
    this.activeInactivedoughnutChart();
    this.stuVsProfChart();
   
   
  }
  gotoCoursePage(type){
    console.log(type)
      this.route.navigateByUrl('/Admin/auth/listCourses', { state: { type: type } });
  }

  freeCourse(){
   this.isFreeCourseEnable = true;
   this.isEnrolledCoursesEnable = false;
  }

  enrolledCourse(){
    this.isFreeCourseEnable = false;
    this.isEnrolledCoursesEnable = true;
  }
  activeLearner(){
  this.activeAndInactiveLearnerChart();
  this.newRegisterIsable = false;
  this.activeLearnerisable = true;
  this.availCoursesenable = false;
  this.istotenvEnable = false;
  }
  newRegister(){
    this.newRegisterIsable = true;
    this.activeLearnerisable = false;
    this.availCoursesenable = false;
    this.istotenvEnable = false;
  }

  availableCourses(){
    this.newRegisterIsable = false;
    this.activeLearnerisable = false;
    this.availCoursesenable = true;
    this.istotenvEnable = false;
  }

  totalEnrollments(){
    this.newRegisterIsable = false;
    this.activeLearnerisable = false;
    this.availCoursesenable = false;
    this.istotenvEnable = true;
    this.enrolledCoursedoughutChart();
  }

  latestcourses(){
    this.islatestcoursesenable = false;
    this.islatestCouresEnable = true;
  }

  availableCourse(){
    this.islatestcoursesenable = true;
    this.islatestCouresEnable = false;
  }
  onChange(days){
    this.chartFilterdays = days;
    this.newRegistrationsChart(this.chartFilterdays)
  }

  newRegistrationsChart(chartFilterdays){
    this.service.getAdminOverview(chartFilterdays).subscribe((res: any) => {
      if(res.data.getAdminOverview.success == true){
        this.newRegisterLearses = res.data.getAdminOverview.message;
        this.lineChartLabels = this.newRegisterLearses?.perDays.flatMap(i => i._id);
        let  arr = [];arr = this.newRegisterLearses.perDays.flatMap(i => i.count);
        this.lineChartData = [{data: arr, label: 'New registrations' }];
      }else{
        this.alert.openAlert('Please try after sometime',null);
      }
   
    })
    this.lineChartColors = [{borderColor: '#a28bf5', backgroundColor: 'rgba(255, 255, 255, .4)',}];
 
   }

   activeAndInactiveLearnerChart(){
    this.service.getActiveinactiveCount().subscribe((res: any) => {
      console.log(res,'getActiveinactiveCount')
    })
      this.activeLearnerChartData= [{data: [0, 50, 100, 150,200, 250, 300,350], label: 'Series A' },
      { data: [0, 40, 90, 130,150, 250, 280,10], label: 'Series B' },
    ];
      this.activeLearnerChartLabels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
      this.activeLearnerChartColors = [{borderColor: '#7fe7a5', backgroundColor: 'rgba(255, 255, 255, .4)'},
      {borderColor: '#ea6c89', backgroundColor: 'rgba(255, 255, 255, .4)'}
    ];
   }
  
   activeInactivedoughnutChart(){
     this.doughnutChartLabels = ['Active', 'Inactive'];
     this.doughnutChartData = [[150, 105]];
     this.doughnutChartType = 'doughnut';
   }

   enrolledCoursedoughutChart(){
    this.enrollCoursesLabel = ['Free Courses', 'Enrolled Courses'];
     this.enrollCoursesData = [[100,200]];
   }

   stuVsProfChart(){
     this.stuVsProLabels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
     this.stuVsProData = [{data: [0, 50, 100, 150,200, 250, 300,350], label: 'Students' },
     { data: [0, 40, 90, 130,150, 250, 280,10], label: 'Professional' },]
     this.stuVsProColors = [{borderColor: '#8080f8', backgroundColor: 'rgba(255, 255, 255, .4)'},
     {borderColor: '#ea7c37', backgroundColor: 'rgba(255, 255, 255, .4)',}
    ];
   }

   totalVsActiveLernerChart(days){
     this.chartFilterdays = days;
     this.service.getUsersIndays(this.chartFilterdays).subscribe((res: any) => {
       console.log(res,'totalvsact')

    })
    this.totVsActData = [{data: [0,20,40,60,80,100], label: 'Active Learner', type: 'line' },
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Total Learner' }];
    console.log( this.totVsActData,' this.totVsActData')
   }
   


 


   loginPerDayChart(days){
     this.chartFilterdays = days
    this.service.getLoginsPerDay(this.chartFilterdays).subscribe((res: any) => {
      if(res.data.getLoginsPerDay.success == "true"){
        this.getLoginsPerDay = res.data.getLoginsPerDay.message;
        this.loginperDaChartLabels = this.getLoginsPerDay.flatMap(i => i._id);
        let  arr = [];arr = this.getLoginsPerDay.flatMap(i => i.cnt);
        console.log(arr,'per days count')
        this.loginperDayData = [{data: arr, label: 'Login per day' }];
      }else{
        this.alert.openAlert('Please try after sometime',null);
      }
    })
   }

   onTabChanged(event){
     if(event.index == 1){
       this.jsonData= [];
      this.service.getAdmindashboardCoursetab().subscribe((res: any) => {
      this.courseCount = res.data.getAdmindashboardCoursetab.message;
      for (const iterator of this.courseCount.allLast30daysCourses) {
        this.jsonData.push({category:iterator.category_id.category_name,
          courseName:iterator.course_name,subCategory:iterator.parent_sub_category_id.sub_category_name})

      }
      Array.prototype.push.apply(this.ELEMENT_DATA,  this.jsonData);
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
      })
     }else if (event.index == 2){
      this.loginPerDayChart(this.chartFilterdays);
      this.totalVsActiveLernerChart(this.chartFilterdays);
      this.service.getLeranertabCount().subscribe((res: any) => {
        console.log(res)
      })
     }
  
     }

}
