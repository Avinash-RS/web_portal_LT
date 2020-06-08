import { Component, OnInit, TemplateRef } from '@angular/core';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { FormBuilder, FormControl } from '@angular/forms';
import * as myGlobals from '@core/globals';
import { BehaviorSubject } from 'rxjs';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatDialog } from '@angular/material';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catagory-management',
  templateUrl: './catagory-management.component.html',
  styleUrls: ['./catagory-management.component.scss']
})
export class CatagoryManagementComponent implements OnInit {

  addCategoryForm: any; // cat add from
  addSubCategoryForm: any; // sub cat add form
  addSuperSubCategoryForm: any; // sub cat add form
  selectCategoryForm: any; // popop - selct category form
  adminDetails: any;
  loading = false;
  loadingCategory = false;
  loadingCourse = false;
  showHome = true;
  showAddCatForm = false;
  showAddSubCatForm = false;
  showAddSuperSubCatForm = false;
  showCourses = false;
  applyAllCourses = false;
  selectedCategory: any = {};
  selectedSubCategory: any = {};
  selectedSuperSubCategory: any = {};
  categories: any;
  courses: any;
  courseCount: any;
  formTypeCourse: any;
  selectedArray: any = [];
  subCategoryArray: any = [];
  superSubCatArray: any = [];
  pagenumber = 0;
  level: number = null;
  canotEdit = true;
  edit = false;
  trackBy: any;
  /** tree source stuff */
  readonly dataSource$: BehaviorSubject<any[]>;
  readonly treeSource: MatTreeNestedDataSource<any>;
  /** tree control */
  readonly treeControl = new NestedTreeControl<any>(node => node.children);
  readonly hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;

  constructor(private gs: GlobalServiceService, private alert: AlertServiceService, private adminservice: AdminServicesService,
    // tslint:disable-next-line:align
    public learnerservice: LearnerServicesService, private formBuilder: FormBuilder, private dialog: MatDialog,
  ) {
    this.adminDetails = this.gs.checkLogout();
    this.treeSource = new MatTreeNestedDataSource<any>();
    this.dataSource$ = new BehaviorSubject<any[]>([]);
  }

  get f() {
    if (this.showAddCatForm === true) {
      return this.addCategoryForm.controls;
    } else if (this.showAddSubCatForm === true) {
      return this.addSubCategoryForm.controls;
    } else if (this.showAddSuperSubCatForm === true) {
      return this.addSuperSubCategoryForm.controls;
    }
  }


  ngOnInit() {
    this.getallcategories();
  }

  getallcategories() {
    this.selectedCategory = {};
    this.selectedSubCategory = {};
    this.selectedSuperSubCategory = {};
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
        if (node) {
          node.children = category;
          this.treeControl.expand(node);
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
          node.children = category;
          this.treeControl.expand(node);
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
    this.learnerservice.getsupersubcategory(this.selectCategoryForm.value?.subCategory?.sub_category_id)
      .subscribe((result: any) => {
        this.superSubCatArray = result.data.getsupersubcategory.message;
      });
  }

  selectedcategory(category) {
    this.canotEdit = true;
    this.edit = false;
    this.courses = [];
    this.courseCount = null;
    let oldcategory; let oldsubcategory; let oldsupersubcategory;
    if (category.category_id) {
      if (category.checkbox === true) {
        this.level = 1;
        oldcategory = null;
        oldcategory = this.selectedCategory; oldsubcategory = this.selectedSubCategory; oldsupersubcategory =
          this.selectedSuperSubCategory;
        this.selectedCategory = category;
        this.buildForm('category');
        this.assignVariables(false, true, false, false, false);
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
        if (oldsubcategory?.sub_category_id) {
          value1 = this.treeSource._data.value[value].children.findIndex(x => x.sub_category_id === oldsubcategory?.sub_category_id);
          if (category.parent_sub_category_id && oldsubcategory.sub_category_id !== category.parent_sub_category_id[0]) {
            this.treeSource._data.value[value].children[value1].checkbox = false;
          } else if (category.parent_sub_category_id && oldsubcategory.sub_category_id === category.parent_sub_category_id[0]) {
            this.treeSource._data.value[value].children[value1].checkbox = true;
          } else {
            this.treeSource._data.value[value].children[value1].checkbox = false;
          }
        }
        if (oldsupersubcategory?.super_sub_category_id) {
          value2 = this.treeSource._data.value[value].children[value1].children.findIndex(x =>
            x.super_sub_category_id === oldsupersubcategory?.super_sub_category_id);
          if (category.parent_super_sub_category_id && oldsupersubcategory.super_sub_category_id !==
            category.parent_super_sub_category_id[0]) {
            this.treeSource._data.value[value].children[value1].children[value2].checkbox = false;
          } else if (category.parent_super_sub_category_id && oldsupersubcategory.super_sub_category_id ===
            category.parent_super_sub_category_id[0]) {
            this.treeSource._data.value[value].children[value1].children[value2].checkbox = true;
          } else {
            this.treeSource._data.value[value].children[value1].children[value2].checkbox = false;
          }
        }
      } else {
        this.resetAll();
        this.assignVariables(true, false, false, false, false);
      }
    } else if (category.sub_category_id) {
      if (category.checkbox === true) {
        this.level = 2;
        oldsubcategory = null;
        oldsubcategory = this.selectedSubCategory;
        oldcategory = this.selectedCategory;
        oldsupersubcategory = this.selectedSuperSubCategory;
        this.selectedSubCategory = category;
        this.buildForm('subcategory');
        this.assignVariables(false, false, true, false, false);
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
        if (oldsubcategory?.sub_category_id) {
          value1 = this.treeSource._data.value[value].children.findIndex(x => x.sub_category_id === oldsubcategory?.sub_category_id);
          if (category.parent_sub_category_id && oldsubcategory.sub_category_id !== category.parent_sub_category_id[0]) {
            this.treeSource._data.value[value].children[value1].checkbox = false;
          } else if (category.parent_sub_category_id && oldsubcategory.sub_category_id === category.parent_sub_category_id[0]) {
            this.treeSource._data.value[value].children[value1].checkbox = true;
          } else {
            this.treeSource._data.value[value].children[value1].checkbox = false;
          }
        }
        if (oldsupersubcategory?.super_sub_category_id) {
          value2 = this.treeSource._data.value[value].children[value1].children.findIndex(x =>
            x.super_sub_category_id === oldsupersubcategory?.super_sub_category_id);
          if (category.parent_super_sub_category_id &&
            oldsupersubcategory.super_sub_category_id !== category.parent_super_sub_category_id[0]) {
            this.treeSource._data.value[value].children[value1].children[value2].checkbox = false;
          } else if (category.parent_super_sub_category_id &&
            oldsupersubcategory.super_sub_category_id === category.parent_super_sub_category_id[0]) {
            this.treeSource._data.value[value].children[value1].children[value2].checkbox = true;
          } else {
            this.treeSource._data.value[value].children[value1].children[value2].checkbox = false;
            this.selectedSuperSubCategory = {};
          }
        }
      } else {
        this.selectedSubCategory = {};
        this.addSubCategoryForm?.reset();
        if (this.selectedCategory?.category_name !== undefined) {
          this.buildForm('category');
          this.level = 1;
          this.assignVariables(false, true, false, false, false);
        } else {
          this.resetAll();
          this.assignVariables(true, false, false, false, false);
        }
      }
    } else {
      if (category.checkbox === true) {
        this.level = 3;
        oldsubcategory = this.selectedSubCategory;
        oldcategory = this.selectedCategory;
        oldsupersubcategory = this.selectedSuperSubCategory;
        this.selectedSuperSubCategory = category;
        this.buildForm('supersubcategory');
        this.assignVariables(false, false, false, true, false);
        if (this.selectedSuperSubCategory?.super_sub_category_id) {
          const value1 = this.treeSource._data.value.findIndex(x =>
            x.category_id === this.selectedSuperSubCategory?.parent_category_id[0]);
          const value: any = this.treeSource._data.value[value1].children.findIndex(x =>
            x.sub_category_id === this.selectedSuperSubCategory?.parent_sub_category_id[0]);
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
        if (oldsubcategory?.sub_category_id) {
          value1 = this.treeSource._data.value[value].children.findIndex(x =>
            x.sub_category_id === oldsubcategory?.sub_category_id);
          if (category.parent_sub_category_id && oldsubcategory.sub_category_id !== category.parent_sub_category_id[0]) {
            this.treeSource._data.value[value].children[value1].checkbox = false;
          } else if (category.parent_sub_category_id && oldsubcategory.sub_category_id === category.parent_sub_category_id[0]) {
            this.treeSource._data.value[value].children[value1].checkbox = true;
          } else {
            this.treeSource._data.value[value].children[value1].checkbox = false;
          }
        }
        if (oldsupersubcategory?.super_sub_category_id) {
          value2 = this.treeSource._data.value[value].children[value1].children.findIndex(x =>
            x.super_sub_category_id === oldsupersubcategory?.super_sub_category_id);
          if (category.parent_super_sub_category_id && oldsupersubcategory.super_sub_category_id !==
            category.parent_super_sub_category_id[0]) {
            this.treeSource._data.value[value].children[value1].children[value2].checkbox = false;
          } else if (category.parent_super_sub_category_id && oldsupersubcategory.super_sub_category_id ===
            category.parent_super_sub_category_id[0]) {
            this.treeSource._data.value[value].children[value1].children[value2].checkbox = true;
          } else {
            this.treeSource._data.value[value].children[value1].children[value2].checkbox = false;
          }
        }
      } else {
        this.selectedSuperSubCategory = {};
        this.addSuperSubCategoryForm?.reset();
        if (this.selectedSubCategory?.sub_category_name !== undefined) {
          this.buildForm('subcategory');
          this.level = 2;
          this.assignVariables(false, false, true, false, false);
        } else if (this.selectedCategory?.category_name !== undefined) {
          this.buildForm('category');
          this.level = 1;
          this.assignVariables(false, true, false, false, false);
        } else {
          this.resetAll();
          this.assignVariables(true, false, false, false, false);
        }
      }
    }
  }

  gotoAdd() {
    if (this.selectedCategory.category_name === undefined) {
      this.buildForm('category');
      this.assignVariables(false, true, false, false, false);
      this.canotEdit = false;
    } else if (this.selectedCategory.category_name !== undefined && this.selectedSubCategory.sub_category_name === undefined) {
      this.buildForm('subcategory');
      this.assignVariables(false, false, true, false, false);
      this.canotEdit = false;
    } else if (this.selectedCategory.category_name !== undefined && this.selectedSubCategory.sub_category_name !== undefined
      && this.selectedSuperSubCategory.super_sub_category_name === undefined) {
      this.buildForm('supersubcategory');
      this.assignVariables(false, false, false, true, false);
      this.canotEdit = false;
    }
  }

  changeNav(formType) {
    if (formType === 'addCategoryForm') {
      this.buildForm('category');
      this.assignVariables(false, true, false, false, false);
    } else if (formType === 'addSubCategoryForm') {
      this.buildForm('subcategory');
      this.assignVariables(false, false, true, false, false);
    } else if (formType === 'addSuperSubCategoryForm') {
      this.buildForm('supersubcategory');
      this.assignVariables(false, false, false, true, false);
    }
  }

  uploadFile(fileInput: any) {
    this.loading = true;
    if (fileInput) {
      const selectfile = fileInput[0] as File;
      if (selectfile && selectfile.type !== 'image/png' && selectfile.type !== 'image/jpeg' && selectfile.type !== 'image/jpg') {
        this.alert.openAlert('Image should only be Jpeg or png format', null);
        this.loading = false;
      } else {
        if (selectfile) {
          const fb = new FormData();
          fb.append('image', selectfile, selectfile.name);
          this.learnerservice.imageupload(fb).subscribe((data: any) => {
            const spliturl = data.url.split('/');
            const uploadurl = spliturl[0] + '//' + spliturl[1] + spliturl[2] + '/' + data.path;
            this.addCategoryForm.controls.category_image.setValue(uploadurl);
            this.loading = false;
          });
        }
      }
    } else {
      this.loading = false;
    }
  }

  cancel(type) {
    if (type === 'supersubcategory') {
      this.addSuperSubCategoryForm.reset();
      if (this.edit) {
        this.buildForm('supersubcategory');
        this.assignVariables(false, false, false, true, false);
        this.edit = false;
        this.canotEdit = true;
      } else {
        this.buildForm('subcategory');
        this.assignVariables(false, false, true, false, false);
      }
    } else if (type === 'subcategory') {
      this.addSubCategoryForm.reset();
      if (this.edit) {
        this.buildForm('subcategory');
        this.edit = false;
        this.canotEdit = true;
        this.assignVariables(false, false, true, false, false);
      } else {
        this.buildForm('category');
        this.assignVariables(false, true, false, false, false);
      }
    } else {
      if (this.edit) {
        this.buildForm('category');
        this.edit = false;
        this.canotEdit = true;
        this.assignVariables(false, true, false, false, false);
      } else {
        this.resetAll();
        this.assignVariables(true, false, false, false, false);
      }
    }
  }

  gotoDelete() {
    const inputid = this.level === 1 ? this.selectedCategory.category_id : this.level === 2 ?
      this.selectedSubCategory.sub_category_id : this.selectedSuperSubCategory.super_sub_category_id;
    const type = this.level === 1 ? 'Category' : this.level === 2 ?
      'Subcategory' : 'Supersubcategory';
    const alert = this.level === 1 || this.level === 2 ? 'This category has courses/ subcategory attached to it' :
      'This category has courses attached to it';
    Swal.fire({
      // title: 'Are you sure want to delete ' + type.toLowerCase() + ' ?',
      title: 'This ' + type.toLowerCase() + ' will be deleted',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Confirm',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.value) {
        this.adminservice.deleteCategory(inputid, this.level).subscribe((results: any) => {
          if (results.data.delete_catalogue.success === false) {
            // Swal.fire({ text: 'Move/Remove the subcategories/courses to delete this ' + type, });
            Swal.fire({
              html:
                alert
              // 'Move/Remove the subcategories/courses to delete this ' + '<b>' + type + '</b> '
            });
          } else if (results.data.delete_catalogue.success === true) {
            Swal.fire({
              html:
                '<strong>' + type + '</strong> ' + '  has been deleted.'
            });
            // Swal.fire('Deleted!', type + '   has been deleted.', 'success');
            this.showHome = true; this.showCourses = false;
            this.showAddCatForm = this.showHome = this.showAddSubCatForm = this.showAddSuperSubCatForm = false;
            this.getallcategories();
          }
        });
      }
    });
  }

  hideCourses() {
    if (this.selectedCategory?.category_name !== undefined && this.selectedSubCategory?.sub_category_name === undefined &&
      this.selectedSuperSubCategory?.super_sub_category_name === undefined) {
      this.buildForm('category');
      this.assignVariables(false, true, false, false, false);
    } else if (this.selectedCategory?.category_name !== undefined && this.selectedSubCategory?.sub_category_name !== undefined &&
      this.selectedSuperSubCategory?.super_sub_category_name === undefined) {
      this.buildForm('subcategory');
      this.assignVariables(false, false, true, false, false);
    } else {
      this.buildForm('supersubcategory');
      this.assignVariables(false, false, false, true, false);
    }
  }

  addCategory(formType) {
    const value = formType === 'category' ? this.addCategoryForm.value : (formType === 'subcategory') ? this.addSubCategoryForm.value :
      this.addSuperSubCategoryForm.value;
    if (this.edit) {
      const category = {
        input_id: formType === 'category' ? this.selectedCategory.category_id : (formType === 'subcategory') ?
          this.selectedSubCategory.sub_category_id : this.selectedSuperSubCategory.super_sub_category_id,
        input_name: value.category_name || value.sub_category_name || value.super_sub_category_name,
        input_description: value.category_description || value.sub_category_description || value.super_sub_category_description || 'null',
        input_image: value.category_image || '',
        level: formType === 'category' ? 1 : (formType === 'subcategory') ? 2 : 3,
      };
      category.input_name = category.input_name.trim().replace(/&nbsp;/g, '').replace(/<[^\/>][^>]*><\/[^>]+>/g, '');
      this.adminservice.updateCatagory(category).subscribe((result: any) => {
        formType === 'category' ? this.addCategoryForm?.reset() : (formType === 'subcategory') ? this.addSubCategoryForm?.reset() :
          this.addSuperSubCategoryForm?.reset();
        this.showHome = true;
        this.showAddSubCatForm = this.showAddCatForm = this.showAddSuperSubCatForm = this.showCourses = false;
        if (result?.data?.update_catalogue?.success) {
          this.alert.openAlert('Details have been updated successfully', null);
          this.getallcategories();
        } else {
          this.alert.openAlert(result?.data?.create_catelogue?.message, null);
        }
      });
    } else {
      const category = {
        input_name: value.category_name || value.sub_category_name || value.super_sub_category_name,
        input_description: value.category_description || value.sub_category_description || value.super_sub_category_description || 'null',
        input_image: value.category_image || 'null',
        creator_id: this.adminDetails._id,
        level: formType === 'category' ? 1 : (formType === 'subcategory') ? 2 : 3,
        apply_all_courses: false,
        course_id: [],
        parent_category_id: this.selectedCategory?.category_id || 'null',
        parent_sub_category_id: this.selectedSubCategory?.sub_category_id || 'null',
      };
      category.input_name = category.input_name.trim().replace(/&nbsp;/g, '').replace(/<[^\/>][^>]*><\/[^>]+>/g, '');
      this.adminservice.createCategory(category).subscribe((result: any) => {
        formType === 'category' ? this.addCategoryForm?.reset() : (formType === 'subcategory') ? this.addSubCategoryForm?.reset() :
          this.addSuperSubCategoryForm?.reset();
        if (result?.data?.create_catelogue?.success) {
          this.getallcategories();
        } else {
          this.alert.openAlert(result?.data?.create_catelogue?.message, null);
        }
      });
    }
  }

  getcourses(formType) {
    this.loadingCourse = true;
    this.formTypeCourse = formType;
    this.showCourses = true;
    this.showAddCatForm = this.showHome = this.showAddSubCatForm = this.showAddSuperSubCatForm = false;
    // this.pagenumber = 0;
    const value = formType === 'category' ? this.selectedCategory : (formType === 'subcategory') ? this.selectedSubCategory :
      this.selectedSuperSubCategory;
    const category = {
      type: formType, _id: value.category_id || value.sub_category_id || value.super_sub_category_id,
      pagenumber: this.pagenumber || 0
    };
    if (this.pagenumber === 0) {
      this.courses = [];
    }
    this.learnerservice.getcourse(category).subscribe((result: any) => {
      this.courses.push(...result?.data?.get_course_by_subcategory?.message);
      this.loadingCourse = false;
      this.courseCount = result?.data?.get_course_by_subcategory?.total_count || this.courses.length;
    });
  }

  getNextCourse() {
    this.pagenumber = this.pagenumber + 1;
    this.getcourses(this.formTypeCourse);
  }

  selectCourse(c, id) {
    if (c.isChecked === undefined || c.isChecked === false) {
      c.isChecked = true;
      this.selectedArray.push(c);
    } else {
      c.isChecked = !c.isChecked;
      this.selectedArray = this.selectedArray.filter(i => i !== c);
    }
  }

  openMoveTo(templateRef: TemplateRef<any>) {
    this.selectCategoryForm = this.formBuilder.group({
      category: new FormControl('', myGlobals.req),
      subCategory: new FormControl('', []),
      subSubCategory: new FormControl('', []),
    });
    this.dialog.open(templateRef);
  }

  closedialogbox() {
    this.dialog.closeAll();
  }

  moveCourses() {
    this.closedialogbox();
    this.loadingCourse = true;
    const level = this.selectCategoryForm?.value?.category !== '' &&
      this.selectCategoryForm?.value?.subCategory === '' && this.selectCategoryForm?.value?.subSubCategory === '' ? 1 :
      this.selectCategoryForm?.value?.category !== '' &&
        this.selectCategoryForm?.value?.subCategory !== '' && this.selectCategoryForm?.value?.subSubCategory === '' ? 2 :
        this.selectCategoryForm?.value?.category !== '' &&
        this.selectCategoryForm?.value?.subCategory !== '' && this.selectCategoryForm?.value?.subSubCategory !== '' && 3;
    const arra = !this.applyAllCourses && this.selectedArray.map((item: any) => item.course_id);
    const course = {
      old_level: this.level,
      old_category_id: this.selectedCategory?.category_id,
      old_sub_category_id: this.selectedSubCategory?.sub_category_id || 'null',
      old_super_sub_category_id: this.selectedSuperSubCategory?.super_sub_category_id || 'null',
      level,
      apply_all_courses: this.applyAllCourses || false,
      course_id: arra || [],
      category_id: this.selectCategoryForm.value.category?.category_id,
      sub_category_id: this.selectCategoryForm.value.subCategory?.sub_category_id || 'null',
      super_sub_category_id: this.selectCategoryForm.value.subSubCategory?.super_sub_category_id || 'null',
    };
    this.adminservice.reAssignCourses(course).subscribe((result: any) => {
      if (result?.data?.reassigncourse?.success) {
        this.loadingCourse = false;
        const msg1 = this.selectCategoryForm?.value.category.category_name;
        const msg2 = this.selectCategoryForm?.value.subCategory?.sub_category_name ? '> '
          + this.selectCategoryForm?.value.subCategory?.sub_category_name : ' ';
        const msg3 = this.selectCategoryForm?.value.subSubCategory?.super_sub_category_name ? '> '
          + this.selectCategoryForm?.value.subSubCategory?.super_sub_category_name : ' ';
        Swal.fire({
          html:
            'Selected courses successfully moved to  <b> <p style="margin-top:12px">' + msg1 + ' ' + msg2 + ' ' + msg3 +
            '</p></b> '
        });
        this.getcourses(this.level === 1 ? 'category' : this.level === 2 ? 'subcategory' : 'supersubcategory');
        this.selectCategoryForm?.reset();
        this.selectedArray = [];
        this.subCategoryArray = [];
        this.superSubCatArray = [];
      } else {
        this.loadingCourse = false;
        this.alert.openAlert(result?.data?.reassigncourse?.message, null);
      }
    });
  }

  onScrollDown() {
    this.pagenumber = this.pagenumber + 1;
    this.adminservice.getcategories(this.pagenumber).subscribe((result: any) => {
      const resultdata = result?.data?.getcategoryadmin?.message;
      if (resultdata.length) {
        let array: any;
        array = resultdata;
        this.categories = this.treeSource.data;
        this.categories.push(...array);
        this.treeSource.data = null;
        this.treeSource.data = this.categories;
      }
    });
  }

  buildForm(type) {
    if (type === 'category') {
      this.addCategoryForm = this.formBuilder.group({
        category_name: new FormControl('', myGlobals.textVal),
        category_description: new FormControl(''),
        category_image: ['', myGlobals.req]
      });
      this.selectedCategory.category_description = this.selectedCategory.category_description === 'null' ? '' :
        this.selectedCategory.category_description;
      if (this.selectedCategory && this.selectedCategory?.category_name) {
        this.addCategoryForm.patchValue(this.selectedCategory);
      }
    } else if (type === 'subcategory') {
      this.addSubCategoryForm = this.formBuilder.group({
        sub_category_name: new FormControl('', myGlobals.textVal),
        sub_category_description: new FormControl(''),
      });
      this.selectedSubCategory.sub_category_description = this.selectedSubCategory.sub_category_description === 'null' ? '' :
        this.selectedSubCategory.sub_category_description;
      if (this.selectedSubCategory && this.selectedSubCategory?.sub_category_name) {
        this.addSubCategoryForm.patchValue(this.selectedSubCategory);
      }
    } else {
      this.addSuperSubCategoryForm = this.formBuilder.group({
        super_sub_category_name: new FormControl('', myGlobals.textVal),
        super_sub_category_description: new FormControl(''),
      });
      this.selectedSuperSubCategory.super_sub_category_description =
        this.selectedSuperSubCategory.super_sub_category_description === 'null' ? '' :
          this.selectedSuperSubCategory.super_sub_category_description;
      if (this.selectedSuperSubCategory && this.selectedSuperSubCategory?.super_sub_category_name) {
        this.addSuperSubCategoryForm.patchValue(this.selectedSuperSubCategory);
      }
    }
  }

  assignVariables(home, cat, subcat, supersubcat, course) {
    this.showHome = home;
    this.showAddCatForm = cat;
    this.showAddSubCatForm = subcat;
    this.showAddSuperSubCatForm = supersubcat;
    this.showCourses = course;
  }

  resetAll() {
    this.level = null;
    this.selectedSubCategory = {};
    this.addSubCategoryForm?.reset();
    this.selectedCategory = {};
    this.addCategoryForm?.reset();
    this.selectedSuperSubCategory = {};
    this.addSuperSubCategoryForm?.reset();
  }
   // tslint:disable-next-line:use-life-cycle-interface
   ngOnDestroy() {
    if (this.dialog) {
        this.dialog.closeAll();
    }
 }
}
// 721
