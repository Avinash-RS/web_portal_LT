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
  loadingCategory: boolean = false;
  showHome: boolean = true;
  showAddCatForm: boolean = false;
  showAddSubCatForm: boolean = false;
  showAddSuperSubCatForm: boolean = false;
  showCourses: boolean = false;
  applyAllCourses: boolean = false;
  selectedCategory: any = {};
  selectedSubCategory: any = {};
  selectedSuperSubCategory: any = {};
  categories: any;
  courses: any;
  selectedArray: any = [];
  subCategoryArray: any = [];
  superSubCatArray: any = [];
  pagenumber = 0;
  level: number;

  /** tree source stuff */
  readonly dataSource$: BehaviorSubject<any[]>;
  readonly treeSource: MatTreeNestedDataSource<any>;
  /** tree control */
  readonly treeControl = new NestedTreeControl<any>(node => node.children);
  readonly hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;
  course_count: any;


  constructor(private gs: GlobalServiceService, private alert: AlertServiceService, private adminservice: AdminServicesService,
    public learnerservice: LearnerServicesService, private formBuilder: FormBuilder, private router: Router, private dialog: MatDialog,
  ) {
    this.adminDetails = this.gs.checkLogout();
    // this.courses = [
    //   {
    //     name: "Web Development",
    //     src: "assets/courses/1.jpg",
    //   },
    //   {
    //     name: "Business Analyst",
    //     src: "assets/courses/2.jpg",
    //   },
    //   {
    //     name: "Photography",
    //     src: "assets/courses/3.jpg",
    //   },
    //   {
    //     name: "Code study",
    //     src: "assets/courses/4.jpg",
    //   },
    //   {
    //     name: "Web Development",
    //     src: "assets/courses/1.jpg",
    //   },
    //   {
    //     name: "Business Analyst",
    //     src: "assets/courses/2.jpg",
    //   },
    //   {
    //     name: "Photography",
    //     src: "assets/courses/3.jpg",
    //   },
    //   {
    //     name: "Code study",
    //     src: "assets/courses/4.jpg",
    //   },
    //   {
    //     name: "Web Development",
    //     src: "assets/courses/1.jpg",
    //   },
    //   {
    //     name: "Business Analyst",
    //     src: "assets/courses/2.jpg",
    //   },
    //   {
    //     name: "Photography",
    //     src: "assets/courses/3.jpg",
    //   },
    //   {
    //     name: "Code study",
    //     src: "assets/courses/4.jpg",
    //   },

    // ];

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
    else if (this.showAddSuperSubCatForm == true) {
      return this.addSuperSubCategoryForm.controls;
    }
  }

  getallcategories() {
    this.loadingCategory = true;
    this.treeSource.data = null;
    this.pagenumber = 0;
    this.adminservice.getcategories(this.pagenumber).subscribe((result: any) => {
      this.treeSource.data = null;
      this.categories = result.data.getcategoryadmin.message;
      this.treeSource.data = this.categories;
      this.dataSource$.next(this.categories);
      this.loadingCategory = false;
    });
  }

  loadsubcategory(node) {
    if (node.category_id) {
      this.learnerservice.getcoursesubcategory(node.category_id).subscribe((result: any) => {
        const category = result.data.get_sub_category.message;
        // this.subCategoryArray =  result.data.get_sub_category.message;
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

  loadsubcategoryDropDown() {
    this.learnerservice.getcoursesubcategory(this.selectCategoryForm.value?.category.category_id).subscribe((result: any) => {
      this.subCategoryArray = result.data.get_sub_category.message;
    });
  }
  loadSupersubcategoryDropDown() {
    this.learnerservice.getsupersubcategory(this.selectCategoryForm.value?.subCategory?.sub_category_id).subscribe((result: any) => {
      this.superSubCatArray = result.data.getsupersubcategory.message;
    });
  }

  selectedcategory(category) {
    let oldcategory; let oldsubcategory; let oldsupersubcategory;
    if (category.category_id) {
      if (category.checkbox === true) {
        oldcategory = null;
        oldcategory = this.selectedCategory; oldsubcategory = this.selectedSubCategory; oldsupersubcategory = this.selectedSuperSubCategory;
        this.selectedCategory = category;
        this.addCategoryForm = this.formBuilder.group({
          category_name: new FormControl('', myGlobals.req),
          category_description: new FormControl([]),
          category_image: ['', myGlobals.req]
        });
        this.addCategoryForm.patchValue(this.selectedCategory);
        this.showAddCatForm = true;
        this.showAddSubCatForm = this.showHome = this.showAddSuperSubCatForm = this.showCourses = false;
        let value; let value1; let value2;
        if (oldcategory?.category_id) {
          value = this.treeSource._data.value.findIndex(x => x.category_id === oldcategory?.category_id);
          if (category.parent_category_id && oldcategory.category_id !== category?.parent_category_id[0]) {
            this.treeSource._data.value[value].checkbox = false;
          } else if (category.parent_category_id && oldcategory.category_id === category?.parent_category_id[0]) {
            this.treeSource._data.value[value].checkbox = true;
          } else {
            this.selectedSuperSubCategory = {}; this.selectedSubCategory = {}; this.treeSource._data.value[value].checkbox = false;
          }
        }
        if (oldsubcategory.sub_category_id) {
          value1 = this.treeSource._data.value[value].children.findIndex(x => x.sub_category_id === oldsubcategory?.sub_category_id);
          if (category.parent_sub_category_id && oldsubcategory.sub_category_id !== category.parent_sub_category_id[0]) {
            this.treeSource._data.value[value].children[value1].checkbox = false;
          } else if (category.parent_sub_category_id && oldsubcategory.sub_category_id === category.parent_sub_category_id[0]) {
            this.treeSource._data.value[value].children[value1].checkbox = true;
          } else {
            this.treeSource._data.value[value].children[value1].checkbox = false;
          }
        }
        if (oldsupersubcategory.super_sub_category_id) {
          value2 = this.treeSource._data.value[value].children[value1].children.findIndex(x => x.super_sub_category_id === oldsupersubcategory?.super_sub_category_id);
          if (category.parent_super_sub_category_id && oldsupersubcategory.super_sub_category_id !== category.parent_super_sub_category_id[0]) {
            this.treeSource._data.value[value].children[value1].children[value2].checkbox = false;
          } else if (category.parent_super_sub_category_id && oldsupersubcategory.super_sub_category_id === category.parent_super_sub_category_id[0]) {
            this.treeSource._data.value[value].children[value1].children[value2].checkbox = true;
          } else {
            this.treeSource._data.value[value].children[value1].children[value2].checkbox = false;
          }
        }
      } else {
        this.selectedSubCategory = {};
        this.addSubCategoryForm.reset();
        this.selectedCategory = {};
        this.addCategoryForm.reset();
        this.selectedSuperSubCategory = {};
        this.addSuperSubCategoryForm.reset();
        this.showHome = true;
        this.showAddSubCatForm = this.showAddCatForm = this.showAddSuperSubCatForm = this.showCourses = false;
      }
    } else if (category.sub_category_id) {
      if (category.checkbox === true) {
        oldsubcategory = null;
        oldsubcategory = this.selectedSubCategory;
        oldcategory = this.selectedCategory;
        oldsupersubcategory = this.selectedSuperSubCategory;
        this.selectedSubCategory = category;
        this.addSubCategoryForm = this.formBuilder.group({
          sub_category_name: new FormControl('', myGlobals.req),
          sub_category_description: new FormControl([]),
        });
        this.addSubCategoryForm.patchValue(this.selectedSubCategory);
        this.showAddSubCatForm = true;
        this.showAddCatForm = this.showHome = this.showAddSuperSubCatForm = this.showCourses = false;
        if (this.selectedSubCategory?.sub_category_id) {
          const value = this.treeSource._data.value.findIndex(x => x.category_id === this.selectedSubCategory?.parent_category_id[0]);
          this.treeSource._data.value[value].checkbox = true;
          this.selectedCategory = this.treeSource._data.value[value];
        }
        let value; let value1; let value2;
        if (oldcategory?.category_id) {
          value = this.treeSource._data.value.findIndex(x => x.category_id === oldcategory?.category_id);
          if (category.parent_category_id && oldcategory.category_id !== category?.parent_category_id[0]) {
            this.selectedSuperSubCategory = {};
            this.treeSource._data.value[value].checkbox = false;
          } else if (category.parent_category_id && oldcategory.category_id === category?.parent_category_id[0]) {
            this.treeSource._data.value[value].checkbox = true;
          } else {
            this.treeSource._data.value[value].checkbox = false;
          }
        }
        if (oldsubcategory.sub_category_id) {
          value1 = this.treeSource._data.value[value].children.findIndex(x => x.sub_category_id === oldsubcategory?.sub_category_id);
          if (category.parent_sub_category_id && oldsubcategory.sub_category_id !== category.parent_sub_category_id[0]) {
            this.treeSource._data.value[value].children[value1].checkbox = false;
          } else if (category.parent_sub_category_id && oldsubcategory.sub_category_id === category.parent_sub_category_id[0]) {
            this.treeSource._data.value[value].children[value1].checkbox = true;
          } else {
            this.treeSource._data.value[value].children[value1].checkbox = false;
          }
        }
        if (oldsupersubcategory.super_sub_category_id) {
          value2 = this.treeSource._data.value[value].children[value1].children.findIndex(x => x.super_sub_category_id === oldsupersubcategory?.super_sub_category_id);
          if (category.parent_super_sub_category_id && oldsupersubcategory.super_sub_category_id !== category.parent_super_sub_category_id[0]) {
            this.treeSource._data.value[value].children[value1].children[value2].checkbox = false;
          } else if (category.parent_super_sub_category_id && oldsupersubcategory.super_sub_category_id === category.parent_super_sub_category_id[0]) {
            this.treeSource._data.value[value].children[value1].children[value2].checkbox = true;
          } else {
            this.treeSource._data.value[value].children[value1].children[value2].checkbox = false;
            this.selectedSuperSubCategory = {};
          }
        }
      } else {
        this.selectedSubCategory = {};
        this.addSubCategoryForm.reset();
        if (this.selectedCategory?.category_name != undefined) {
          this.addCategoryForm = this.formBuilder.group({
            category_name: new FormControl('', myGlobals.req),
            category_description: new FormControl([]),
            category_image: ['', myGlobals.req]
          });
          this.addCategoryForm.patchValue(this.selectedCategory);
          this.showAddCatForm = true;
          this.showAddSubCatForm = this.showHome = this.showAddSuperSubCatForm = this.showCourses = false;
        }
        else {
          this.selectedSubCategory = {};
          this.addSubCategoryForm.reset();
          this.selectedCategory = {};
          this.addCategoryForm.reset();
          this.selectedSuperSubCategory = {};
          this.addSuperSubCategoryForm.reset();
          this.showHome = true;
          this.showAddSubCatForm = this.showAddCatForm = this.showAddSuperSubCatForm = this.showCourses = false;
        }
      }
    } else {
      if (category.checkbox === true) {
        oldsubcategory = this.selectedSubCategory;
        oldcategory = this.selectedCategory;
        oldsupersubcategory = this.selectedSuperSubCategory;
        this.selectedSuperSubCategory = category;
        this.addSuperSubCategoryForm = this.formBuilder.group({
          super_sub_category_name: new FormControl('', myGlobals.req),
          super_sub_category_description: new FormControl([]),
        });
        this.addSuperSubCategoryForm.patchValue(this.selectedSuperSubCategory);
        this.showAddSuperSubCatForm = true;
        this.showAddCatForm = this.showHome = this.showAddSubCatForm = this.showCourses = false;

        if (this.selectedSuperSubCategory?.super_sub_category_id) {
          const value1 = this.treeSource._data.value.findIndex(x => x.category_id === this.selectedSuperSubCategory?.parent_category_id[0]);
          const value: any = this.treeSource._data.value[value1].children.findIndex(x => x.sub_category_id === this.selectedSuperSubCategory?.parent_sub_category_id[0]);
          this.treeSource._data.value[value1].checkbox = true;
          this.treeSource._data.value[value1].children[value].checkbox = true;
          oldcategory = this.selectedCategory;
          oldsubcategory = this.selectedSubCategory;
          this.selectedCategory = this.treeSource._data.value[value1];
          this.selectedSubCategory = this.treeSource._data.value[value1].children[value];
        }
        let value; let value1; let value2;
        if (oldcategory?.category_id) {
          value = this.treeSource._data.value.findIndex(x => x.category_id === oldcategory?.category_id);
          if (category.parent_category_id && oldcategory.category_id !== category?.parent_category_id[0]) {
            this.treeSource._data.value[value].checkbox = false;
          } else if (category.parent_category_id && oldcategory.category_id === category?.parent_category_id[0]) {
            this.treeSource._data.value[value].checkbox = true;
          } else {
            this.treeSource._data.value[value].checkbox = false;
          }
        }
        if (oldsubcategory.sub_category_id) {
          value1 = this.treeSource._data.value[value].children.findIndex(x => x.sub_category_id === oldsubcategory?.sub_category_id);
          if (category.parent_sub_category_id && oldsubcategory.sub_category_id !== category.parent_sub_category_id[0]) {
            this.treeSource._data.value[value].children[value1].checkbox = false;
          } else if (category.parent_sub_category_id && oldsubcategory.sub_category_id === category.parent_sub_category_id[0]) {
            this.treeSource._data.value[value].children[value1].checkbox = true;
          } else {
            this.treeSource._data.value[value].children[value1].checkbox = false;
          }
        }
        if (oldsupersubcategory.super_sub_category_id) {
          value2 = this.treeSource._data.value[value].children[value1].children.findIndex(x => x.super_sub_category_id === oldsupersubcategory?.super_sub_category_id);
          if (category.parent_super_sub_category_id && oldsupersubcategory.super_sub_category_id !== category.parent_super_sub_category_id[0]) {
            this.treeSource._data.value[value].children[value1].children[value2].checkbox = false;
          } else if (category.parent_super_sub_category_id && oldsupersubcategory.super_sub_category_id === category.parent_super_sub_category_id[0]) {
            this.treeSource._data.value[value].children[value1].children[value2].checkbox = true;
          } else {
            this.treeSource._data.value[value].children[value1].children[value2].checkbox = false;
          }
        }
      } else {
        this.selectedSuperSubCategory = {};
        this.addSuperSubCategoryForm.reset();
        if (this.selectedSubCategory?.sub_category_name != undefined) {
          this.addSubCategoryForm = this.formBuilder.group({
            sub_category_name: new FormControl('', myGlobals.req),
            sub_category_description: new FormControl([]),
          });
          this.addSubCategoryForm.patchValue(this.selectedSubCategory);
          this.showAddSubCatForm = true;
          this.showAddCatForm = this.showHome = this.showAddSuperSubCatForm = this.showCourses = false;
        } else if (this.selectedCategory?.category_name != undefined) {
          this.addCategoryForm = this.formBuilder.group({
            category_name: new FormControl('', myGlobals.req),
            category_description: new FormControl([]),
            category_image: ['', myGlobals.req]
          });
          this.addCategoryForm.patchValue(this.selectedCategory);
          this.showAddCatForm = true;
          this.showAddSubCatForm = this.showHome = this.showAddSuperSubCatForm = this.showCourses = false;
        }
        else {
          this.selectedSubCategory = {};
          this.addSubCategoryForm.reset();
          this.selectedCategory = {};
          this.addCategoryForm.reset();
          this.selectedSuperSubCategory = {};
          this.addSuperSubCategoryForm.reset();
          this.showHome = true;
          this.showAddSubCatForm = this.showAddCatForm = this.showAddSuperSubCatForm = this.showCourses = false;
        }
      }
    }
  }

  gotoAdd() {
    if (this.selectedCategory.category_name == undefined) {
      this.addCategoryForm = this.formBuilder.group({
        category_name: new FormControl('', myGlobals.req),
        category_description: new FormControl([]),
        category_image: ['', myGlobals.req]
      });
      this.showAddCatForm = true;
      this.showAddSubCatForm = this.showHome = this.showAddSuperSubCatForm = this.showCourses = false;
    }
    else if (this.selectedCategory.category_name != undefined && this.selectedSubCategory.sub_category_name == undefined) {
      this.addSubCategoryForm = this.formBuilder.group({
        sub_category_name: new FormControl('', myGlobals.req),
        sub_category_description: new FormControl([]),
      });
      this.showAddSubCatForm = true;
      this.showAddCatForm = this.showHome = this.showAddSuperSubCatForm = this.showCourses = false;
    }
    else if (this.selectedCategory.category_name != undefined && this.selectedSubCategory.sub_category_name != undefined
      && this.selectedSuperSubCategory.super_sub_category_name == undefined) {
      this.addSuperSubCategoryForm = this.formBuilder.group({
        super_sub_category_name: new FormControl('', myGlobals.req),
        super_sub_category_description: new FormControl(''),
      });
      this.showAddSuperSubCatForm = true;
      this.showAddCatForm = this.showHome = this.showAddSubCatForm = this.showCourses = false;
    }
  }

  changeNav(formType) {
    if (formType == 'addCategoryForm') {
      this.addCategoryForm = this.formBuilder.group({
        category_name: new FormControl('', myGlobals.req),
        category_description: new FormControl([]),
        category_image: ['', myGlobals.req]
      });
      this.addCategoryForm.patchValue(this.selectedCategory);
      this.showAddCatForm = true;
      this.showAddSubCatForm = this.showHome = this.showAddSuperSubCatForm = this.showCourses = false;
    } else if (formType == 'addSubCategoryForm') {
      this.addSubCategoryForm = this.formBuilder.group({
        sub_category_name: new FormControl('', myGlobals.req),
        sub_category_description: new FormControl([]),
      });
      this.addSubCategoryForm.patchValue(this.selectedSubCategory);
      this.showAddSubCatForm = true;
      this.showAddCatForm = this.showHome = this.showAddSuperSubCatForm = this.showCourses = false;
    }
    else if (formType == 'addSuperSubCategoryForm') {
      this.addSuperSubCategoryForm = this.formBuilder.group({
        super_sub_category_name: new FormControl('', myGlobals.req),
        super_sub_category_description: new FormControl(''),
      });
      this.addSuperSubCategoryForm.patchValue(this.selectedSuperSubCategory);
      this.showAddSuperSubCatForm = true;
      this.showAddCatForm = this.showHome = this.showAddSubCatForm = this.showCourses = false;
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
      input_name: value.category_name || value.sub_category_name || value.super_sub_category_name,
      input_description: value.category_description || value.sub_category_description || value.super_sub_category_description || "null",
      input_image: value.category_image || "null",
      creator_id: this.adminDetails._id,
      level: formType == 'category' ? 1 : (formType == 'subcategory') ? 2 : 3,
      apply_all_courses: false,
      course_id: [],
      parent_category_id: this.selectedCategory?.category_id || "null",
      parent_sub_category_id: this.selectedSubCategory?.sub_category_id || "null",
    }
    this.adminservice.createCatalogue(category).subscribe((result: any) => {
      formType == 'category' ? this.addCategoryForm.reset() : (formType == 'subcategory') ? this.addSubCategoryForm.reset() :
        this.addSuperSubCategoryForm.reset();
      if (result?.data?.create_catelogue?.success)
        this.getallcategories();
      else
        this.alert.openAlert(result?.data?.create_catelogue?.message, null)
    });
  }

  getcourses(formType) {
    this.showCourses = true;
    this.showAddCatForm = this.showHome = this.showAddSubCatForm = this.showAddSuperSubCatForm = false;
    this.pagenumber = 0;
    const value = formType == 'category' ? this.selectedCategory : (formType == 'subcategory') ? this.selectedSubCategory :
      this.selectedSuperSubCategory;
    const category = {
      type: formType, _id: value.category_id || value.sub_category_id || value.super_sub_category_id,
      pagenumber: this.pagenumber
    };
    // category.type = formType;
    // category._id = value.category_id || value.sub_category_id || value.super_sub_category_id;
    // category.pagenumber = this.pagenumber;
    this.learnerservice.getcourse(category).subscribe((result: any) => {
      this.courses = result?.data?.get_course_by_subcategory?.message;
      this.course_count = result?.data?.get_course_by_subcategory?.course_count || 10;
      console.log(this.courses)
    });
  }

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
    let level = this.selectCategoryForm?.value?.category != undefined &&
      this.selectCategoryForm?.value?.subCategory == undefined && this.selectCategoryForm?.value?.subSubCategory == undefined && 1;
    level = this.selectCategoryForm?.value?.category != undefined &&
      this.selectCategoryForm?.value?.subCategory != undefined && this.selectCategoryForm?.value?.subSubCategory == undefined && 2;
    level = this.selectCategoryForm?.value?.category != undefined &&
      this.selectCategoryForm?.value?.subCategory != undefined && this.selectCategoryForm?.value?.subSubCategory != undefined && 3;
    !this.selectedArray && this.selectedArray.map((item: any) => item.course_id)
    // old_level: course.old_level,
    // old_category_id: course.old_category_id,
    // old_sub_category_id: course.old_sub_category_id,
    // old_super_sub_category_id: course.old_super_sub_category_id,
    // level: course.level,
    // apply_all_courses: course.apply_all_courses,
    // course_id: course.course_id,
    // category_id: course.category_id,
    // sub_category_id: course.sub_category_id,
    // super_sub_category_id: course.super_sub_category_id
    let course = {
      old_level: this.level,
      old_category_id: this.selectedCategory?.category_id,
      old_sub_category_id: this.selectedSubCategory?.sub_category_id,
      old_super_sub_category_id: this.selectedSuperSubCategory?.super_sub_category_id,
      level: level,
      apply_all_courses: this.applyAllCourses || false,
      course_id: this.selectedArray || [],
      category_id: this.selectCategoryForm.value.category?.category_id,
      sub_category_id: this.selectCategoryForm.value.subCategory?.sub_category_id || "null",
      super_sub_category_id: this.selectCategoryForm.value.subSubCategory?.super_sub_category_id || "null",
    }
    console.log(course)
    // this.adminservice.reAssignCourses(course).subscribe((result: any) => {
    //   // this.courses = result?.data?.get_course_by_subcategory?.message;
    //   console.log(result)
    // });
  }
}








// onResize(event) {
//   if (event.target.innerWidth <= 600)
//     this.breakpoint = 1;
//   else if (event.target.innerWidth >= 600 && event.target.innerWidth <= 768)
//     this.breakpoint = 2;
//   else if (event.target.innerWidth >= 768 && event.target.innerWidth <= 1024)
//     this.breakpoint = 3;
//   // else if (event.target.innerWidth >= 992 && event.target.innerWidth <= 1200)
//   //   this.breakpoint = 4;
//   else
//     this.breakpoint = 4;
// }

    // if (window.innerWidth <= 600)
    //   this.breakpoint = 1;
    // else if (window.innerWidth >= 600 && window.innerWidth <= 768)
    //   this.breakpoint = 2;
    // else if (window.innerWidth >= 768 && window.innerWidth <= 1024)
    //   this.breakpoint = 3;
    // // else if (window.innerWidth >= 992 && window.innerWidth <= 1200)
    // //   this.breakpoint = 4;
    // else
    //   this.breakpoint = 4;