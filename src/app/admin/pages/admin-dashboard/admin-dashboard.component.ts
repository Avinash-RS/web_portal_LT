import { Component, OnInit, ViewChild } from '@angular/core';
import { Color, Label,MultiDataSet,} from 'ng2-charts';
import { ChartDataSets, ChartOptions, } from 'chart.js';
import { Router } from '@angular/router';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
// import 'chart.piecelabel.js';
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
  public lineChartColors: Color[] = [{borderColor: '#a28bf5', backgroundColor: 'rgba(255, 255, 255, .4)',}];
  public lineChartLegend = true;
  public lineChartType = "line";
  public lineChartPlugins = [pluginDataLabels];
  public lineChartOptions:any = {responsive: true,
  scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        backgroundColor: '#a28bf5',
        borderRadius: 4,
          color: 'white',
						font: {
							weight: 'bold'
						},
        anchor: 'end',
        align: 'end',
      }
    }
  };
// Active and inactive learner chart var
  public activeLearnerChartData: ChartDataSets[] = [{data: [], label: 'Series A' }];
  public activeLearnerChartLabels: Label[] = [];
  public activeLearnerPlugins = [pluginDataLabels];
    public activeLearnerChartColors: Color[] = [{borderColor: '#7fe7a5', backgroundColor: 'rgba(255, 255, 255, .4)'},
  {borderColor: '#ea6c89', backgroundColor: 'rgba(255, 255, 255, .4)'}];

  public activeLearnerChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        stacked: true
      }]
    },
    plugins: {
      datalabels: {
        backgroundColor: function(context) {
          return context.dataset.borderColor;
        },
        borderRadius: 4,
          color: 'white',
						font: {
							weight: 'bold'
						},
            anchor: 'end',
            align: 'end',
      }
    }
  };

// Active InActive doughut Chart
public doughnutChartLabels: Label[] = [];
public doughnutChartData: MultiDataSet = [[]];
public doughnutChartType;
public doughnutPlugins = [pluginDataLabels];
public doughnutColors: Color[] = [{ backgroundColor: ['#7fe7a5', '#ea6c89']}];
 public doughnut: ChartOptions  = {
  responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        font: {
          weight: 'bold',
          size : 20
        },
        formatter: (value, ctx) => {
          const label = ctx.chart.data[ctx.dataIndex];
          return label;
        },
      },
    }
}

// Enrolled Course doughut Chart
public enrollCoursesLabel :  Label[] = [];
public enrollCoursesData: MultiDataSet = [];
public enrollChartType = 'doughnut';
public enrollPlugins = [pluginDataLabels];
public enrollCoursesColors: Color[] = [{backgroundColor: ['#a6bbf3', '#f5dc99']}];
public enrollCoursesCount: any = {
  responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        font: {
          weight: 'bold'
        },
        formatter: (value, ctx) => {
          const label = ctx.chart.data[ctx.dataIndex];
          return label;
        },
      },
    }
}

// Student vs Professional line char
public stuVsProData: ChartDataSets[] = [{data: [], label: 'Series A' }];
public stuVsProLabels: Label[] = [];
public stuVsProOptions: any = {
  responsive: true,
  scales: {
    yAxes: [{
      stacked: true
    }]
  },
  plugins: {
    datalabels: {
      backgroundColor: function(context) {
        return context.dataset.borderColor;
      },
      borderRadius: 4,
        color: 'white',
          font: {
            weight: 'bold'
          },
          anchor: 'end',
          align: 'end',
    }
  }

};
public stuVsProColors: Color[] = [{borderColor: '#8080f8', backgroundColor: 'rgba(255, 255, 255, .4)'},
{borderColor: '#ea7c37', backgroundColor: 'rgba(255, 255, 255, .4)'}];

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
// Category Chart
public categoryChartLabels: Label[] = ['Level 1', 'Level 2', 'Level 3'];
public categoryChartData: MultiDataSet = [[350, 450, 100],[50, 150, 120],[250, 130, 70],
];
public categoryChartType = 'doughnut';

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
  totvsActiveDayCount: any;
  activeInactivegraphdata: any;
  learnertabData: any;
  stuVsProfData: any;
  studentVsProfDays: any;
 
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
   
   
   
   
  }
  gotoCoursePage(type){
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
  this.activeAndInactiveLearnerChart(this.chartFilterdays);
  // this.activeInactivedoughnutChart();
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
   }

   activeAndInactiveLearnerChart(days){
    this.service.getActiveinactiveCount(days ? days : 7).subscribe((res: any) => {
      if(res.data.getActiveinactiveCount.success == "true"){
        this.activeInactivegraphdata = res.data.getActiveinactiveCount.message;
        this.activeLearnerChartLabels = this.activeInactivegraphdata.ActiveUser.flatMap(i => i._id);
        let  activeUserCount = [];activeUserCount = this.activeInactivegraphdata.ActiveUser.flatMap(i => i.count);
        let inactiveUserCount = []; inactiveUserCount = this.activeInactivegraphdata.InActiveUser.flatMap(i => i.count);
        this.activeLearnerChartData= [{data: activeUserCount, label: 'Active' },{ data: inactiveUserCount, label: 'InActive' }];
        // Enrolled Active and In-active chart
        this.doughnutChartLabels = ['Active', 'Inactive'];
        this.doughnutChartData = [[this.activeInactivegraphdata.EnrolledActive, this.activeInactivegraphdata.EnrolledInActive]];
        this.doughnutChartType = 'doughnut';
      }else{
        this.alert.openAlert('Please try after sometime',null);
      }
    })
   }
  
  //  activeInactivedoughnutChart(){
  //   // this.activeInactivegraphdata.EnrolledActive, this.activeInactivegraphdata.EnrolledInActive
  //   //  this.doughnutChartLabels = ['Active', 'Inactive'];
  //   //  this.doughnutChartData = [[this.activeInactivegraphdata.EnrolledActive, this.activeInactivegraphdata.EnrolledInActive]];
  //   //  this.doughnutChartType = 'doughnut';
  //  }

   enrolledCoursedoughutChart(){
    this.enrollCoursesLabel = ['Free Courses', 'Enrolled Courses'];
     this.enrollCoursesData = [[100,200]];
   }

   stuVsProfChart(days){
    this.service.getProfessionalStudent(days? days: 7).subscribe((res: any) => {
      if(res.data.getProfessionalStudent.success == "true"){
        this.stuVsProfData = res.data.getProfessionalStudent.message;
        this.stuVsProLabels = this.stuVsProfData.student.flatMap(i => i._id);
        let  student = [];student = this.stuVsProfData.student.flatMap(i => i.count);
        let  professional = [];professional = this.stuVsProfData.professional.flatMap(i => i.count);
        this.stuVsProData = [{data: student, label: 'Students' },
        { data: professional, label: 'Professional' }]
      }
    })
    
    //  this.stuVsProLabels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
    //  this.stuVsProData = [{data: [0, 50, 100, 150,200, 250, 300,350], label: 'Students' },
    //  { data: [0, 40, 90, 130,150, 250, 280,10], label: 'Professional' },]
    //  this.stuVsProColors = [{borderColor: '#8080f8', backgroundColor: 'rgba(255, 255, 255, .4)'},
    //  {borderColor: '#ea7c37', backgroundColor: 'rgba(255, 255, 255, .4)',}
    // ];
   }

   totalVsActiveLernerChart(days){
    //  this.totvsActiveDayCount = days;
    //  this.service.getUsersIndays(this.totvsActiveDayCount ? this.totvsActiveDayCount : 7).subscribe((res: any) => {
    //   if(res.data.getUsersInWeeks.success == "true"){
    //       console.log(res.data.getUsersInWeeks)
    //   }else{
    //     this.alert.openAlert('Please try after sometime',null);
    //   }

    // })
    this.totVsActData = [{data: [10,20,40,60,80,100], label: 'Active Learner', type: 'line' , borderColor:"#eb7e37",backgroundColor:"rgba(255, 255, 255, .4)" },
    { data: [59, 80, 81, 56, 55, 40], label: 'Total Learner', type: 'bar',backgroundColor:"#b6a2fa" }];
    console.log( this.totVsActData,' this.totVsActData')
   }
   

   loginPerDayChart(days){
     this.chartFilterdays = days
    this.service.getLoginsPerDay(this.chartFilterdays).subscribe((res: any) => {
      if(res.data.getLoginsPerDay.success == "true"){
        this.getLoginsPerDay = res.data.getLoginsPerDay.message;
        this.loginperDaChartLabels = this.getLoginsPerDay.flatMap(i => i._id);
        let  arr = [];arr = this.getLoginsPerDay.flatMap(i => i.cnt);
        this.loginperDayData = [{data: arr, label: 'Login per day' }];
      }else{
        this.alert.openAlert('Please try after sometime',null);
      }
    })
   }

   onTabChanged(event){
     if(event.index == 1){
      
      this.service.getAdmindashboardCoursetab().subscribe((res: any) => {
      this.courseCount = res.data.getAdmindashboardCoursetab.message;
      for (const iterator of this.courseCount.allLast30daysCourses) {
          this.jsonData= [];
          this.jsonData.push({category:iterator.category_id.category_name,
          courseName:iterator.course_name,subCategory:iterator.parent_sub_category_id.sub_category_name}); 
      }
      Array.prototype.push.apply(this.ELEMENT_DATA,  this.jsonData);
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
      })
     }else if (event.index == 2){
      this.loginPerDayChart(this.chartFilterdays);
      this.totalVsActiveLernerChart(this.chartFilterdays);
      this.stuVsProfChart(this.chartFilterdays);
      this.service.getLeranertabCount().subscribe((res: any) => {
       this.learnertabData = res.data.getLeranertabCount.message;
      })
     }
    }
}
