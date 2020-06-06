import { Component, OnInit, ViewChild } from '@angular/core';
import { Color, Label,MultiDataSet,} from 'ng2-charts';
import { ChartDataSets, ChartOptions, } from 'chart.js';
import { Router } from '@angular/router';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
export interface PeriodicElement {
  courseName: string;
  position: number;
  category: string;
  subCategory: string;
  superSubCategory : string;
}

export interface PeriodicElement {
  courseName: string;
  totalEnrolled:number;
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

  EnrolledCoursesJson :any =[]
  EnrolledCourse_ELEMENT_Data: PeriodicElement[] = [];
  enrolledCoursedataSource = new MatTableDataSource(this.EnrolledCourse_ELEMENT_Data);
  EnrolledCourseCol: string[] = ['position', 'courseName','totalEnrolled', 'category', 'subCategory', 'superSubCategory'];
  // new register chart val
  public lineChartData: ChartDataSets[] = [{data: [], label: 'Series A' }];
  public lineChartLabels: Label[];
  public lineChartColors: Color[] = [{borderColor: '#a28bf5', backgroundColor: 'rgba(255, 255, 255, .4)',}];
  public lineChartLegend = true;
  public lineChartType = "line";
  public lineChartPlugins = [pluginDataLabels];
  public lineChartOptions:any = {responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          userCallback: function(label, index, labels) {
            if (Math.floor(label) === label) {
              return label}},}}]},
    plugins: {
      datalabels: {
        backgroundColor: '#a28bf5',
        borderRadius: 4,
          color: 'white',
						font: {
							weight: 'bold'
						},
            datalabels: {
              align: 'end',
              anchor: 'end'
            }
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
        ticks: {
          beginAtZero: true,
          userCallback: function(label, index, labels) {
            if (Math.floor(label) === label) {
              return label}},}}]},
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
            datalabels: {
              align: 'end',
              anchor: 'end'
            }
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
      
      labels: {
        padding: 15,
        fontSize: 15,
        usePointStyle: true
      }
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
public enrollCoursesData: MultiDataSet = [[]];
public enrollChartType = 'doughnut';
public enrollPlugins = [pluginDataLabels];
public enrollCoursesColors: Color[] = [{backgroundColor: ['#a6bbf3', '#f5dc99']}];
public enrollCoursesCount: any = {
  responsive: true,
    legend: {
      position: 'top',
      labels: {
        fontSize: 12,
        padding: 15,
        usePointStyle: true
      }
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
public stuVsprofChartType = 'line';
public  stuVsprofLegend = true;
public stuVsprofPlugins = [pluginDataLabels];
public stuVsProColors: Color[] = [{borderColor: '#8080f8', backgroundColor: 'rgba(255, 255, 255, .4)'},
{borderColor: '#ea7c37', backgroundColor: 'rgba(255, 255, 255, .4)'}];
public stuVsProOptions: any = {
  responsive: true,
  scales: {
    yAxes: [{
      // stacked : true,
      ticks: {
        beginAtZero: true,
        userCallback: function(label, index, labels) {
          if (Math.floor(label) === label) {
            return label}},}}]},
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
          datalabels: {
            align: 'end',
            anchor: 'end'
          }
    }
  }

};


// Total VS Active Learner
public totVsActLabels: Label[] = [];
public totVsActChartType = 'bar';
public totVsActChartLegend = true;
public totVsActChartPlugins = [];
public totVsActColors: Color[] = [];
public totVsActData: ChartDataSets[] = [{data: [], label: 'Series A' }];
public totVsActChartOptions: any = {
  responsive: true,
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        userCallback: function(label, index, labels) {
          if (Math.floor(label) === label) {
            return label}},}}]},
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
          datalabels: {
            align: 'end',
            anchor: 'end'
          }
    }
 
  }
};

//Login Per Day Chart
public loginperDayData: ChartDataSets[] = [{data: [], label: 'Series A' }];
public loginperDaChartLabels: Label[] = [];
public loginperDaChartColors: Color[] = [{borderColor: '#a28bf5', backgroundColor: 'rgba(255, 255, 255, .4)'}];
public loginperDaChartLegend = true;
public loginperDaChartType = 'line';
public loginperDaChartPlugins = [];
public loginperDaChartOptions: any = {
  responsive: true,
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        userCallback: function(label, index, labels) {
          if (Math.floor(label) === label) {
            return label}},}}]},
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
          datalabels: {
            align: 'end',
            anchor: 'end'
          }
    }
 
  }
};

// Category Chart
public categoryChartLabels: Label[] = [];
public categoryChartData: MultiDataSet = [];
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
  actvstotday:number=7;
  loginPerDayFilter:number=7;
  stuvsprofDay:number=7;
  actvsinactDay:number=7;
  newRegisterLearses : any;
  enrolledAndFreeCourseData: any;
  totVsActiveChart: any;
  courseCount: any;
  getLoginsPerDay: any;
  totvsActiveDayCount: any;
  activeInactivegraphdata: any;
  learnertabData: any;
  stuVsProfData: any;
  enrollementpert: any;
  top5CourseDefault = 'topfiveEnroll';
  top5CourseData: any;
  adminDetails: any;
  getCoursecate: any;
 
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
    this.adminDetails = JSON.parse(localStorage.getItem('adminDetails'))
    this.getCoursesChart();
    this.newRegistrationsChart(this.chartFilterdays);
    this.activeAndInactiveLearnerChart(this.actvsinactDay);
    this.stuVsProfChart(this.stuvsprofDay);
    this.getLearnerTabCount();
    this.getCoursesTabData();
  }
  gotoCoursePage(type){
    if (type == 'draft' || type == 'created'){
      this.route.navigateByUrl('/Admin/auth/listCourses', { state: { type: type } });
    }else{
      this.route.navigateByUrl('/Admin/auth/enrollment');
    }
      
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
  this.activeAndInactiveLearnerChart(this.actvsinactDay);
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
    this.getEnrolledAndFreeCourseData(this.chartFilterdays)
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
    this.service.getAdminOverview(chartFilterdays,this.adminDetails.user_id).subscribe((res: any) => {
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

   stuVsProfChart(days){
    this.service.getProfessionalStudent(days? days: 7).subscribe((res: any) => {
      if(res.data.getProfessionalStudent.success == "true"){
        this.stuVsProfData = res.data.getProfessionalStudent.message;
        this.stuVsProLabels = this.stuVsProfData.student.flatMap(i => i._id);
        let  student = [];student = this.stuVsProfData.student.flatMap(i => i.count);
        let  professional = [];professional = this.stuVsProfData.professional.flatMap(i => i.count);
        this.stuVsProData = [{data: student, label: 'Students' },
        { data: professional, label: 'Professional' }]
      }else{
        this.alert.openAlert('Please try after sometime',null);
      }
    })
   }

   totalVsActiveLernerChart(days){
     this.actvstotday = days;
     this.service.getUsersIndays(this.actvstotday ? this.actvstotday : 7).subscribe((res: any) => {
      if(res.data.getUsersInWeeks.success == "true"){
        this.totVsActiveChart = res.data.getUsersInWeeks.message;
        this.totVsActLabels = this.totVsActiveChart.active_Users.flatMap(i => i._id);
        let  Active = [];Active = this.totVsActiveChart.active_Users.flatMap(i => i.count);
        let  Inactive = [];Inactive = this.totVsActiveChart.total_Users.flatMap(i => i.count);
        this.totVsActData = [{data: Active, label: 'Active Learner', type: 'line' , borderColor:"#eb7e37",backgroundColor:"rgba(255, 255, 255, .4)" },
        { data: Inactive, label: 'Total Learner', borderColor:"#b6a2fa",backgroundColor:"#b6a2fa" }];
      }else{
        this.alert.openAlert('Please try after sometime',null);
      }
    })
   }
   

   loginPerDayChart(days){
     this.loginPerDayFilter= days;
      this.service.getLoginsPerDay(this.loginPerDayFilter).subscribe((res: any) => {
      if(res.data.getLoginsPerDay.success == "true"){
        this.getLoginsPerDay = res.data.getLoginsPerDay.message;
        this.loginperDaChartLabels = this.getLoginsPerDay.flatMap(i => i._id);
        let  arr = [];arr = this.getLoginsPerDay.flatMap(i => i.count);
        this.loginperDayData = [{data: arr, label: 'Login per day' }];
      }else{
        this.alert.openAlert('Please try after sometime',null);
      }
    })
   }

   onTabChanged(event){
     if(event.index == 1){
       this.top5Course(this.top5CourseDefault);
     }else if (event.index == 2){
      this.loginPerDayChart(this.loginPerDayFilter);
      this.totalVsActiveLernerChart(this.actvstotday);
      this.stuVsProfChart(this.stuvsprofDay);
     }
    }
       getEnrolledAndFreeCourseData(days){
        this.service.enrolledCourse(parseInt(days) ? parseInt(days) : 7).subscribe((res: any) => {
          if(res.data.enrolledCourse.success == true){
          this.enrolledAndFreeCourseData = res.data.enrolledCourse.message;
          //Enrolled and Free course chart
          this.enrollCoursesLabel = ['Free Courses', 'Enrolled Courses'];
          this.enrollCoursesData = [[res.data.enrolledCourse.freecourse,res.data.enrolledCourse.enrollcourse]];
          for (const iterator of this.enrolledAndFreeCourseData) {
            if(iterator.category_id==null){
              var category_id = {
                category_id :'NA'
              }
              iterator.category_id=category_id
          } 
          if(iterator.parent_sub_category_id==null){
              var parent_sub_category_id = {
                parent_sub_category_id:'NA'
              }
              iterator.parent_sub_category_id=parent_sub_category_id;
          } 
          
          if(iterator.super_sub_category_id==null){
              var super_sub_category_id={
                super_sub_category_name:'NA'
              }
              iterator.super_sub_category_id=super_sub_category_id.super_sub_category_name
          }

            this.EnrolledCoursesJson.push({
              category:iterator.category_id.category_name,
              courseName:iterator.course.course_name,
              totalEnrolled:iterator.count,
              subCategory:iterator.parent_sub_category_id.sub_category_name,
              superSubCategory:iterator.super_sub_category_id
            }); 
        }
       
        Array.prototype.push.apply(this.EnrolledCourse_ELEMENT_Data,this.EnrolledCoursesJson);
          this.enrolledCoursedataSource = new MatTableDataSource<PeriodicElement>(this.EnrolledCourse_ELEMENT_Data);
          }else{
            this.alert.openAlert('Please try after sometime',null);
          }
        })
      }

      top5Course(type){
        this.service.getTopfiveDashboardType(type).subscribe((res: any) => {
          if(res.data.getTopfiveDashboardType.success == 'true'){
            this.top5CourseData = res.data.getTopfiveDashboardType.data;
          }else{
            this.alert.openAlert('Please try after sometime',null);
          }
         })
      }

   // getting Learner Tab Cart count
      getLearnerTabCount(){
        this.service.getLeranertabCount().subscribe((res: any) => {
          this.learnertabData = res.data.getLeranertabCount.message;
         })
      }
   // getting Course Tab Cart count
      getCoursesTabData(){
        this.jsonData= [];
        this.service.getAdmindashboardCoursetab().subscribe((res: any) => {
        this.courseCount = res.data.getAdmindashboardCoursetab.message;
        for (const iterator of this.courseCount.allLast30daysCourses) {
          if(iterator.category_id.category_name==null){
              iterator.category_id.category_name='NA'
          } 
          if(iterator.parent_sub_category_id.sub_category_name==null){
              iterator.parent_sub_category_id.sub_category_name='NA';
          } 
          
          if(iterator.super_sub_category_id==null){
              var super_sub_category_id={
                super_sub_category_name:'NA'
              }
              iterator.super_sub_category_id=super_sub_category_id
          }
            this.jsonData.push({category:iterator.category_id.category_name,
            courseName:iterator.course_name,
            subCategory:iterator.parent_sub_category_id.sub_category_name,
            superSubCategory:iterator.super_sub_category_id.super_sub_category_name
          }); 
        }
        Array.prototype.push.apply(this.ELEMENT_DATA,  this.jsonData);
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
        })
      }


      getCoursesChart(){
        this.service.getCoursesChart().subscribe((res: any) => {
          if(res.data.getCoursesChart.success == 'true'){
            this.getCoursecate = res.data.getCoursesChart.data;
            console.log(this.getCoursecate,'this.getCoursecate')
        
            // for (const iterator of this.getCoursecate) {
            //     console.log(iterator.main_cat[0].main_cat_course_count)
            //     this.categoryChartData = [[iterator.main_cat[0].category_name,10,30]];
            //     //  iterator.sub_cat[0].sub_category_name, 
            //     //  iterator.sub_sub_cat[0].sub_sub_cat_course_count
                
            // }
            console.log( this.categoryChartData,' this.categoryChartData')
             this.categoryChartLabels = ['Level 1', 'Level 2', 'Level 3'];
             this.categoryChartData = [[350, 450, 100],[50, 150, 120],[250, 130, 70]];
          }
        })
      }
}
