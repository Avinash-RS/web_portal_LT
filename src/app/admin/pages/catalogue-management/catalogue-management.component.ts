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

  addCategoryForm: any;
  addSubCategoryForm: any;
  adminDetails: any;
  showHome: boolean = true;
  showAddCatForm: boolean = false;
  showAddSubCatForm: boolean = false;
  selectedCategory: any = null;
  selectedSubCategory: any = null;
  loading: boolean;

  // userDetailes: any;
  // allcourses: any;

  constructor(private gs: GlobalServiceService, private alert: AlertServiceService, private adminservice: AdminServicesService,
    public learnerservice: LearnerServicesService, private formBuilder: FormBuilder, private router: Router,
  ) {
    this.adminDetails = this.gs.checkLogout();
    console.log(this.adminDetails)
  }

  ngOnInit() {
  }

  gotoAdd() {
    if (this.selectedCategory == null) {
      this.addCategoryForm = this.formBuilder.group({
        categoryName: new FormControl('', myGlobals.req),
        categoryDescription: new FormControl('', myGlobals.req),
        categoryImage: ['', myGlobals.req]
      });
      this.showAddCatForm = true;
      this.showAddSubCatForm = false;
      this.showHome = false;
    }
    else if (this.selectedSubCategory == null) {
      this.addSubCategoryForm = this.formBuilder.group({
        subCategoryName: new FormControl('', myGlobals.req),
        subCategoryDescription: new FormControl('', myGlobals.req),
        subCategoryImage: ['', myGlobals.req]
      });
      this.showAddCatForm = false;
      this.showAddSubCatForm = true;
      this.showHome = false;
    }
  }

  get f() {
    if (this.showAddCatForm == true) {
      return this.addCategoryForm.controls;
    }
    else if (this.showAddSubCatForm == true) {
      return this.addSubCategoryForm.controls;
    }
  }

  uploadFile(fileInput: any) {
    this.loading = true;
    console.log(fileInput)
    debugger
    if (fileInput && fileInput.target && fileInput.target.files[0]) {
      var selectfile = <File>fileInput.target.files[0];
      if (selectfile && selectfile.type != 'image/png' && selectfile.type != 'image/jpeg' && selectfile.type != 'image/jpg') {
        this.alert.openAlert('Image should only be Jpeg or png format', null)
        this.loading = false;
      }
      // else if (selectfile && selectfile.size > 100000) {
      //   this.alert.openAlert('Image should be less than 1 MB', null)
      // }
      else {
        if (selectfile) {
          console.log(selectfile, selectfile.name)
          const fb = new FormData();
          fb.append('image', selectfile, selectfile.name)
          this.learnerservice.imageupload(fb).subscribe((data : any)=> {
            this.addCategoryForm.controls['categoryImage'].setValue(data.path);
            this.loading = false;
          })
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

  addCategory() {
    // input_name : "Civil And Structural Framework",
    // input_description : "All the Civil And Structural Framework related courses will be under this category",
    // input_image : "https://3.imimg.com/data3/EO/IQ/MY-10638644/civil-and-structural-design-detailing-250x250.png",
    // creator_id : "5e69f4ad139c79bbf14adc8a",
    // level : 2,
    // apply_all_courses : false,
    // course_id : ["1mfku71m", "2ae80xyq"],
    // parent_category_id : "hjkjswv5g",
    // parent_sub_category_id : "null"

    console.log(this.addCategoryForm.value)
    var value = this.addCategoryForm.value;
    let category = {
      input_name: value.categoryName,
      input_description: value.categoryDescription,
      input_image: value.categoryImage,
      creator_id: this.adminDetails._id,
      level: 1,
      apply_all_courses: false,
      course_id: [],
      parent_category_id: this.selectedCategory.id || "hjkjswv5g",
      parent_sub_category_id: this.selectedSubCategory.id || "null",
    }
    this.adminservice.createCatalogue(category).subscribe((result: any) => {
      console.log()
    });
  }
  // gotoedit() {
  //   console.log(this.userDetailes.group_id[0])
  //   this.learnerservice.getallcourses(this.userDetailes.group_id[0], this.pagenumber).subscribe((result: any) => {
  //     this.allcourses = result.data.get_all_course_by_usergroup.message;
  //   });
  // }

  // 5eb3b5f50d03e1bc320162cd id 
}
