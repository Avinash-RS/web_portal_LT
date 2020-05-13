import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import * as myGlobals from '@core/globals';
import { BehaviorSubject } from 'rxjs';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';
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
  selectedSubCategory : any = null;

  // userDetailes: any;
  // allcourses: any;

  categories: any;
  // userDetailes: any;
  // allcourses: any;

 /** tree source stuff */
 readonly dataSource$: BehaviorSubject<any[]>;
 readonly treeSource: MatTreeNestedDataSource<any>;
 /** tree control */
 readonly treeControl = new NestedTreeControl<any>(node => node.children);
 readonly hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;
  constructor(private gs: GlobalServiceService, private alert: AlertServiceService, private adminservice: AdminServicesService, public learnerservice: LearnerServicesService, private formBuilder: FormBuilder, private router: Router) {
    this.adminDetails = this.gs.checkLogout();
    console.log(this.adminDetails)
    this.treeSource = new MatTreeNestedDataSource<any>();
    this.dataSource$ = new BehaviorSubject<any[]>([]);
  }

  ngOnInit() {
    this.addCategoryForm = this.formBuilder.group({
      categoryName: new FormControl('', myGlobals.req),
      categoryDescription: new FormControl('', myGlobals.req),
      categoryImage: ['', myGlobals.req]
    });
    this.addSubCategoryForm = this.formBuilder.group({
      subCategoryName: new FormControl('', myGlobals.req),
      subCategoryDescription: new FormControl('', myGlobals.req),
      subCategoryImage: ['', myGlobals.req]
    });
    this.getallcategories();
  }

  getallcategories() {
    this.treeSource.data = null;
    // this.treeSource.data = this.categories;
    // this.dataSource$.next(this.categories);

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

  addCategory() {
    console.log(this.addCategoryForm.value)
  }
  // gotoedit() {
  //   console.log(this.userDetailes.group_id[0])
  //   this.learnerservice.getallcourses(this.userDetailes.group_id[0], this.pagenumber).subscribe((result: any) => {
  //     this.allcourses = result.data.get_all_course_by_usergroup.message;
  //   });
  // }

  // 5eb3b5f50d03e1bc320162cd id 
}
