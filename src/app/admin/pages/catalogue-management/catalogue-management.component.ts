import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import * as myGlobals from '@core/globals';

@Component({
  selector: 'app-catalogue-management',
  templateUrl: './catalogue-management.component.html',
  styleUrls: ['./catalogue-management.component.scss']
})
export class CatalogueManagementComponent implements OnInit {
  adminDetails: any;
  showAddCat: boolean = false;
  showHome: boolean = false;
  showCourses: boolean = true;
  addCategoryForm: any;
  courses: any;
  // userDetailes: any;
  // allcourses: any;


  constructor(private gs: GlobalServiceService, private alert: AlertServiceService, private adminservice: AdminServicesService, public learnerservice: LearnerServicesService, private formBuilder: FormBuilder, private router: Router) {
    this.adminDetails = this.gs.checkLogout();
    console.log(this.adminDetails)

    this.courses = [
      {
        name: "Web Development",
        src: "assets/courses/1.jpg",
      },
      {
        name: "Business Analyst",
        src: "assets/courses/2.jpg",
      },
      {
        name: "Photography",
        src: "assets/courses/3.jpg",
      },
      {
        name: "Code study",
        src: "assets/courses/4.jpg",
      },
      {
        name: "Web Development",
        src: "assets/courses/1.jpg",
      },
      {
        name: "Business Analyst",
        src: "assets/courses/2.jpg",
      },
      {
        name: "Photography",
        src: "assets/courses/3.jpg",
      },
      {
        name: "Code study",
        src: "assets/courses/4.jpg",
      },
      {
        name: "Web Development",
        src: "assets/courses/1.jpg",
      },
      {
        name: "Business Analyst",
        src: "assets/courses/2.jpg",
      },
      {
        name: "Photography",
        src: "assets/courses/3.jpg",
      },
      {
        name: "Code study",
        src: "assets/courses/4.jpg",
      },

    ];
  }

  ngOnInit() {
    this.addCategoryForm = this.formBuilder.group({
      categoryName: new FormControl('', myGlobals.req),
      categoryDescription: new FormControl('', myGlobals.req),
      categoryImage: ['', myGlobals.req]
    });
  }

  gotoAdd() {
    this.addCategoryForm = this.formBuilder.group({
      categoryName: new FormControl('', myGlobals.req),
      categoryDescription: new FormControl('', myGlobals.req),
      categoryImage: ['', myGlobals.req]
    });
    console.log("Add works");
    this.showAddCat = !this.showAddCat;
    this.showHome = false;
  }

  get f() {
    return this.addCategoryForm.controls;
  }

  uploadFile(fileInput: any) {
    console.log(fileInput)
    if (fileInput && fileInput.target && fileInput.target.files[0]) {
      var selectfile = <File>fileInput.target.files[0];
      if (selectfile && selectfile.type != 'image/png' && selectfile.type != 'image/jpeg' && selectfile.type != 'image/jpg') {
        this.alert.openAlert('Image should only be Jpeg or png format', null)
      }
      // else if (selectfile && selectfile.size > 100000) {
      //   this.alert.openAlert('Image should be less than 1 MB', null)
      // }
      else {
        if (selectfile) {
          console.log(selectfile, selectfile.name)
          const fb = new FormData();
          // fb.append('image', this.selectfile, this.selectfile.name)
          // this.service.imageupload(fb).subscribe(data => {
          //   this.profileForm.controls['profile_img'].setValue(data);
          //   localStorage.setItem('user_img', 'https://edutechstorage.blob.core.windows.net/' + this.profileForm.value.profile_img.path)
          //   this.profileForm.controls['profile_img'].setValue(localStorage.getItem('user_img'))
          // })
        }
      }
    }
  }

  gotoEdit() {
    console.log("Edit works")
  }

  gotoDelete() {
    console.log("Delete works")
  }

  selectAll() {
    console.log("select all courses")
  }

  hideCourses() {
    console.log("Hide all courses works")
  }

  // gotoedit() {
  //   console.log(this.userDetailes.group_id[0])
  //   this.learnerservice.getallcourses(this.userDetailes.group_id[0], this.pagenumber).subscribe((result: any) => {
  //     this.allcourses = result.data.get_all_course_by_usergroup.message;
  //   });
  // }

  // 5eb3b5f50d03e1bc320162cd id 
}
