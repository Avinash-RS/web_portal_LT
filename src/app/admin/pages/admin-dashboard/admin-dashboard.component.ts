import { Component, OnInit, ViewChild } from '@angular/core';

export interface PeriodicElement {
  courseName: string;
  position: number;
  category: string;
  subCategory: string;
  superSubCategory : string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, courseName: 'Hydrogen', category: 'Hydrogen', subCategory: 'H' ,superSubCategory: ''},
  {position: 2, courseName: 'Helium', category: 'Hydrogen', subCategory: 'He',superSubCategory: ''},
  {position: 3, courseName: 'Lithium', category:'Hydrogen', subCategory: 'Li',superSubCategory: ''},
  {position: 4, courseName: 'Beryllium', category: 'Hydrogen', subCategory: 'Be',superSubCategory: ''},
  {position: 5, courseName: 'Boron', category: 'Hydrogen', subCategory: 'B',superSubCategory: ''}
];

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  displayedColumns: string[] = ['position', 'courseName', 'category', 'subCategory','superSubCategory'];
  dataSource = ELEMENT_DATA;
  days= [];
  public isCollapsed = false;
  public isCollapsed1 = false;
  activeLearnerisable : boolean = false;
  newRegisterIsable : boolean = true;
  availCoursesenable : boolean = false;
  istotenvEnable : boolean = false;
  islatestcoursesenable : boolean = true;
  islatestCouresEnable : boolean = false;
  isFreeCourseEnable : boolean = true;
  isEnrolledCoursesEnable : boolean = false;
  width = 600;
  height = 400;
  type = "line";
  dataFormat = "json";
  newRegistrationsdata: { chart: { theme: string; }; data: { label: string; value: string; }[];};
 

  
  constructor() {

    this.days = [{
      id: 1, name: 'Last 7 days'},
      {id: 2, name: 'Last 14 days'},
  ]
  
   }
    openNav() {
    document.getElementById("myNav").style.height = "100%";
  }
  
   closeNav() {
    document.getElementById("myNav").style.height = "0%";
  }

  ngOnInit() {
   this.newRegistrationsChart();
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
  this.newRegisterIsable = false;
  this.activeLearnerisable = true;
  this.availCoursesenable = false;
  }
  newRegister(){
    this.newRegisterIsable = true;
    this.activeLearnerisable = false;
    this.availCoursesenable = false;
  }

  availableCourses(){
    this.newRegisterIsable = false;
    this.activeLearnerisable = false;
    this.availCoursesenable = true;
  }

  totalEnrollments(){
    this.newRegisterIsable = false;
    this.activeLearnerisable = false;
    this.availCoursesenable = false;
    this.istotenvEnable = true;
  }

  latestcourses(){
    this.islatestcoursesenable = false;
    this.islatestCouresEnable = true;
  }


  availableCourse(){
    this.islatestcoursesenable = true;
    this.islatestCouresEnable = false;
  }

  newRegistrationsChart(){
    const data = {
      chart: {
        caption: "",
        yaxisname: "",
        subcaption: "",
        numbersuffix: " ",
        rotatelabels: "50",
        setadaptiveymin: "50",
        theme: "fusion"
      },
      data: [
        {
          label: "1 may 2020",
          value: "0"
        },
        {
          label: "2 may 2020",
          value: "50"
        },
        {
          label: "3 may 2020",
          value: "100"
        },
        {
          label: "4 may 2020",
          value: "150"
        },
        {
          label: "5 may 2020",
          value: "200"
        },
        {
          label: "6 may 2020",
          value: "250"
        },
        {
          label: "7 may 2020",
          value: "300"
        }
      
      ]
     
    };
    this.newRegistrationsdata = data;
  }
}
