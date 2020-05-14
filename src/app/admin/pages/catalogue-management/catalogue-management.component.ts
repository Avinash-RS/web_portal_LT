import { Component, OnInit, TemplateRef } from '@angular/core';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import * as myGlobals from '@core/globals';
import { BehaviorSubject } from 'rxjs';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatDialog } from '@angular/material';
import { nodeChildrenAsMap } from '@angular/router/src/utils/tree';
@Component({
  selector: 'app-catalogue-management',
  templateUrl: './catalogue-management.component.html',
  styleUrls: ['./catalogue-management.component.scss']
})
export class CatalogueManagementComponent implements OnInit {

  addCategoryForm: any; // cat add from
  addSubCategoryForm: any; // sub cat add form
  addSuperSubCategoryForm: any; // sub cat add form
  selectCategoryForm: any; // popop - selct category form
  adminDetails: any;
  loading: boolean = false;
  showHome: boolean = false;
  showAddCatForm: boolean = false;
  showAddSubCatForm: boolean = false;
  showAddSuperSubCatForm : boolean = false;
  showCourses: boolean = true;
  selectedCategory: any = {};
  selectedSubCategory: any = {};
  selectedSuperSubCategory: any = {};
  categories: any;
  courses: any;
  selectedArray: any = [];
  pagenumber = 0;
  /** tree source stuff */
  readonly dataSource$: BehaviorSubject<any[]>;
  readonly treeSource: MatTreeNestedDataSource<any>;
  /** tree control */
  readonly treeControl = new NestedTreeControl<any>(node => node.children);
  readonly hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;


  constructor(private gs: GlobalServiceService, private alert: AlertServiceService, private adminservice: AdminServicesService,
    public learnerservice: LearnerServicesService, private formBuilder: FormBuilder, private router: Router, private dialog: MatDialog,
  ) {
    this.adminDetails = this.gs.checkLogout();
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

    this.treeSource = new MatTreeNestedDataSource<any>();
    this.dataSource$ = new BehaviorSubject<any[]>([]);
  }

  ngOnInit() {
    this.getallcategories();
  }

  get f() {
    if (this.showAddCatForm == true) {
      return this.addCategoryForm.controls;
    }
    else if (this.showAddSubCatForm == true) {
      return this.addSubCategoryForm.controls;
    }
  }

  getallcategories() {
    this.treeSource.data = null;
    this.pagenumber = 0;
    this.adminservice.getcategories(this.pagenumber).subscribe((result: any) => {
      console.log(result.data);
      this.categories = result.data.getcategoryadmin.message;
      this.treeSource.data = this.categories;
      this.dataSource$.next(this.categories);
    });
  }

  loadsubcategory(node) {
    console.log(node);
    if (node.category_id) {
      this.learnerservice.getcoursesubcategory(node.category_id).subscribe((result: any) => {
        console.log(result.data);
        const category = result.data.get_sub_category.message;
        if (node) {
          // node.children = [
          //   ...(node.children || []),
          //   group
          // ];
          node.children = category;
          // if (!this.treeControl.isExpanded(node)) {
          this.treeControl.expand(node);
          // }
        } else {
          this.dataSource$.next([
            ...this.dataSource$.value, category[0]]);
        }
        const array = this.treeSource.data;
        this.treeSource.data = null;
        this.treeSource.data = array;
      });
    } else {
      this.learnerservice.getsupersubcategory(node.sub_category_id).subscribe((result: any) => {
        console.log(result.data);
        const category = result.data.getsupersubcategory.message;
        if (node) {
          // node.children = [
          //   ...(node.children || []),
          //   group
          // ];
          node.children = category;
          // if (!this.treeControl.isExpanded(node)) {
          this.treeControl.expand(node);
          // }
        } else {
          this.dataSource$.next([
            ...this.dataSource$.value, category[0]]);
        }
        const array = this.treeSource.data;
        this.treeSource.data = null;
        this.treeSource.data = array;
      });
    }
  }

  selectedcategory(category) {
    console.log(category)
    if (category.category_id) {
      if (category.checkbox === true) {
        let oldcategory = null;
        oldcategory = this.selectedCategory;
        this.selectedCategory = category;
        this.addCategoryForm = this.formBuilder.group({
          category_name: new FormControl('', myGlobals.req),
          category_description: new FormControl(''),
          category_image: ['', myGlobals.req]
        });
        this.addCategoryForm.patchValue(this.selectedCategory);
        this.showAddCatForm = true;
        this.showAddSubCatForm = this.showHome = this.showAddSuperSubCatForm = this.showCourses = false;
        if (oldcategory?.category_id) {
          const value = this.treeSource._data.value.findIndex(x => x.category_id === oldcategory?.category_id);
          this.treeSource._data.value[value].checkbox = false;
          this.treeSource._data.value[value]?.children?.forEach(element => {
            element.checkbox = false;
          });
        }
      } else {
        this.selectedCategory = {};
        this.addCategoryForm.reset();
      }
    } else if (category.sub_category_id) {
      if (category.checkbox === true) {
        this.selectedSubCategory = category;
        this.addSubCategoryForm = this.formBuilder.group({
          sub_category_name: new FormControl('', myGlobals.req),
          sub_category_description: new FormControl(''),
        });
        this.addSubCategoryForm.patchValue(this.selectedSubCategory);
        this.showAddSubCatForm = true;
        this.showAddCatForm = this.showHome = this.showAddSuperSubCatForm = this.showCourses = false;
      } else {
        this.selectedSubCategory = {};
        this.addSubCategoryForm.reset();
      }
    } else {
      if (category.checkbox === true) {
        this.selectedSuperSubCategory = category;
        this.addSuperSubCategoryForm = this.formBuilder.group({
          super_sub_category_name: new FormControl('', myGlobals.req),
          super_sub_category_description: new FormControl(''),
        });
        this.addSuperSubCategoryForm.patchValue(this.selectedSubCategory);
        this.showAddSuperSubCatForm = true;
        this.showAddCatForm = this.showHome = this.showAddSubCatForm =  this.showCourses = false;
      } else {
        this.selectedSuperSubCategory = {};
        this.addSuperSubCategoryForm.reset();
      }
    }
  }

  gotoAdd() {
    if (this.selectedCategory.category_name == undefined) {
      this.addCategoryForm = this.formBuilder.group({
        category_name: new FormControl('', myGlobals.req),
        category_description: new FormControl('', myGlobals.req),
        category_image: ['', myGlobals.req]
      });
      this.showAddCatForm = true;
      this.showAddSubCatForm = this.showHome = this.showAddSuperSubCatForm = this.showCourses = false;
      // this.showHome = false;
      // this.showCourses = false;
    }
    else if (this.selectedCategory.category_name != undefined && this.selectedSubCategory.category_name == undefined) {
      this.addSubCategoryForm = this.formBuilder.group({
        sub_category_name: new FormControl('', myGlobals.req),
        sub_category_description: new FormControl('', myGlobals.req),
      });
      this.showAddSubCatForm = true;
      this.showAddCatForm = this.showHome = this.showAddSuperSubCatForm = this.showCourses = false;
      // this.showHome = false;
    }
    else if (this.selectedCategory.category_name != undefined && this.selectedSubCategory.category_name != undefined
      && this.selectedSuperSubCategory.super_sub_category_name == undefined) {
      this.addSuperSubCategoryForm = this.formBuilder.group({
        super_sub_category_name: new FormControl('', myGlobals.req),
        super_sub_category_description: new FormControl(''),
      });
      this.showAddSuperSubCatForm = true;
      this.showAddCatForm = this.showHome = this.showAddSubCatForm =  this.showCourses = false;
    }
  }

  uploadFile(fileInput: any) {
    this.loading = true;
    if (fileInput) {
      var selectfile = <File>fileInput[0];
      if (selectfile && selectfile.type != 'image/png' && selectfile.type != 'image/jpeg' && selectfile.type != 'image/jpg') {
        this.alert.openAlert('Image should only be Jpeg or png format', null)
        this.loading = false;
      }
      // else if (selectfile && selectfile.size > 100000) {
      //   this.alert.openAlert('Image should be less than 1 MB', null)
      // }
      else {
        if (selectfile) {
          const fb = new FormData();
          fb.append('image', selectfile, selectfile.name)
          this.learnerservice.imageupload(fb).subscribe((data: any) => {
            var split_url = data.url.split('/');
            var upload_url = split_url[0] + "//" + split_url[1] + split_url[2] + '/' + data.path
            this.addCategoryForm.controls['category_image'].setValue(upload_url);
            this.loading = false;
          })
        }
      }
    } else
      this.loading = false
  }

  gotoEdit() {
  }

  gotoDelete() {
  }

  selectAll() {
  }

  hideCourses() {
  }

  addCategory(formType) {
    var value = formType == 'category' ? this.addCategoryForm.value : (formType == 'subcategory') ? this.addSubCategoryForm.value :
      this.addSuperSubCategoryForm.value;
    let category = {
      input_name: value.category_name || value.sub_category_name,
      input_description: value.category_description || value.sub_category_description || value.super_sub_category_description || "null",
      input_image: value.category_image || "null",
      creator_id: this.adminDetails._id,
      level: formType == 'category' ? 1 : (formType == 'subcategory') ? 2 : 3,
      apply_all_courses: false,
      course_id: [],
      parent_category_id: this.selectedCategory?.category_id || "null",
      parent_sub_category_id: this.selectedSubCategory?.sub_category_id || "null",
    }
    console.log(category)
    this.adminservice.createCatalogue(category).subscribe((result: any) => {
      console.log(result);
      formType == 'category' ? this.addCategoryForm.reset() : (formType == 'subcategory') ? this.addSubCategoryForm.reset() :
        this.addSuperSubCategoryForm.reset;
      if (result?.data?.create_catelogue?.success)
        this.getallcategories();
      else
        this.alert.openAlert(result?.data?.create_catelogue?.message, null)
    });
  }
  // gotoedit() {
  //   this.learnerservice.getallcourses(this.userDetailes.group_id[0], this.pagenumber).subscribe((result: any) => {
  //     this.allcourses = result.data.get_all_course_by_usergroup.message;
  //   });
  // }

  // 5eb3b5f50d03e1bc320162cd id 

  selectCourse(c, id) {
    if (c.isChecked == undefined || c.isChecked == false) {
      c.isChecked = true;
      this.selectedArray.push(c);
    }
    else {
      c.isChecked = !c.isChecked;
      this.selectedArray = this.selectedArray.filter(i => i !== c);
    }
  }

  openMoveTo(templateRef: TemplateRef<any>) {
    this.selectCategoryForm = this.formBuilder.group({
      category: new FormControl('', myGlobals.req),
      subCategory: new FormControl("", []),
      subSubCategory: new FormControl("", []),
    })
    this.dialog.open(templateRef);
  }

  closedialogbox() {
    this.dialog.closeAll();
  }

  moveCourses() {
    console.log(this.selectCategoryForm)
  }
}
