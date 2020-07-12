import { Component, OnInit } from '@angular/core';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatDialog } from '@angular/material';  
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material';

export interface AddedCourse {
  course_id: string;
  course_img_url: string;
  course_name: string;
}
@Component({
  selector: 'batch-add-course',
  templateUrl: './batch-add-course.component.html',
  styleUrls: ['./batch-add-course.component.scss','../../admin/pages/catagory-management/catagory-management.component.scss']
})
export class BatchAddCourseComponent implements OnInit {
  pagenumber = 0;
  categories: any;
  trackBy: any;
  selectedCategory: any = {};
  selectedSubCategory: any = {};
  selectedSuperSubCategory: any = {};
  loadingCategory = false;
  level: number = null;
  courses: any;
  courseCount: any;
  selectedCourseArray: any = [];
  formTypeCourse;
  selectCourses;
  SelectedData: AddedCourse[] = [];
  readonly dataSource$: BehaviorSubject<any[]>;
  readonly treeSource: MatTreeNestedDataSource<any>;
  /** tree control */
  readonly treeControl = new NestedTreeControl<any>(node => node.children);
  readonly hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;
  constructor(private adminservice: AdminServicesService,public learnerservice: LearnerServicesService,private router: Router,public toast: ToastrService) { 

    this.treeSource = new MatTreeNestedDataSource<any>();
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
  selectedcategory(category,selectedValue) {
    if(category.level == 3 && category.checkbox == true){
      selectedValue = "supersubcategory"
    }
    else if(category.level == undefined && category.checkbox == true){
      selectedValue = "subcategory"
    }
    else if (category.level == undefined && category.checkbox == false){
      selectedValue = "category"
    }
    else if(category.level == 1 && category.checkbox == true){
      selectedValue = "category"
    }
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
      }
    } else if (category.sub_category_id) {
      if (category.checkbox === true) {
        this.level = 2;
        oldsubcategory = null;
        oldsubcategory = this.selectedSubCategory;
        oldcategory = this.selectedCategory;
        oldsupersubcategory = this.selectedSuperSubCategory;
        this.selectedSubCategory = category;
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
        if (this.selectedCategory?.category_name !== undefined) {
          this.level = 1;          
        } else {
          this.resetAll();
        }
      }
    } else {
      if (category.checkbox === true) {
        this.level = 3;
        oldsubcategory = this.selectedSubCategory;
        oldcategory = this.selectedCategory;
        oldsupersubcategory = this.selectedSuperSubCategory;
        this.selectedSuperSubCategory = category;
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
        if (this.selectedSubCategory?.sub_category_name !== undefined) {
          this.level = 2;
        } else if (this.selectedCategory?.category_name !== undefined) {
          this.level = 1;
        } else {
          this.resetAll();
        }
      }
    }
    this.getcourses(selectedValue)
  }
  resetAll() {
    this.level = null;
    this.selectedSubCategory = {};
    this.selectedCategory = {};
    this.selectedSuperSubCategory = {};
  }
  getcourses(formType) {
    // this.pagenumber = 0;
    // this.courses = [];
    // this.selectedCourseArray = []
    const value = formType === 'category' ? this.selectedCategory : (formType === 'subcategory') ? this.selectedSubCategory :
      this.selectedSuperSubCategory;
    const category = {
      type: formType, _id: value.category_id || value.sub_category_id || value.super_sub_category_id,
      pagenumber: this.pagenumber || 0
    };
    if (this.pagenumber === 0) {
      this.courses = [];
    }
    this.formTypeCourse = category.type
    this.learnerservice.getcourse(category).subscribe((result: any) => {
      this.courses.push(...result?.data?.get_course_by_subcategory?.message);
      this.courseCount = result?.data?.get_course_by_subcategory?.total_count || this.courses.length;
    });
  }
  
  selectCourse(c, id) {
    if (c.isChecked === undefined || c.isChecked === false) {
      c.isChecked = true;
      var existingCourse = []
      this.selectedCourseArray.forEach(element => {
        if(element.course_id === c.course_id){
           existingCourse.push("duplicate")
        }
      });
      if(existingCourse.length == 0){
        this.selectedCourseArray.push(c);
      }else{
        c.isChecked = false
        this.toast.warning('Course already added');
      }
    } else {
      c.isChecked = !c.isChecked;
      this.selectedCourseArray = this.selectedCourseArray.filter(i => i !== c);
    }
  }
  removeCourse(value){
    this.selectedCourseArray = this.selectedCourseArray.filter(i => i.course_id == value.course_id);
  }
  changeNav(formType) {
    if (formType === 'addCategoryForm') {
     // this.buildForm('category');
    } else if (formType === 'addSubCategoryForm') {
     // this.buildForm('subcategory');      
    } else if (formType === 'addSuperSubCategoryForm') {
     // this.buildForm('supersubcategory');      
    }
  }
  getNextCourse() {
    this.pagenumber = this.pagenumber + 1;
    this.getcourses(this.formTypeCourse);
  }
  selectAll(){    
    this.courses.forEach(element => {
      element.isChecked = true
    });

    // const compareName = (obj1, obj2)=>{
    //   return (obj1.course_id === obj2.course_id);
    // }
    
    // let output = this.selectedCourseArray.filter(b=>{
    //   let indexFound = this.courses.findIndex(a => compareName(a, b));
    //   return indexFound == -1;
    // })
    // this.selectedCourseArray = output;
    this.selectedCourseArray = this.courses
  }

  addCourses(){        
    const keys_to_keep = ['course_id', 'course_name','course_img_url'];
    const courseValue = this.selectedCourseArray.map(o => keys_to_keep.reduce((acc, curr) => {
    acc[curr] = o[curr];
    return acc;
    }, {}));  
    // var value = courseValue
// this.router.navigateByUrl('/', {skipLocationChange: true})
    // .then(() => this.router.navigateByUrl('/Admin/auth/viewReport', { state: { type: value } }));
    // to send data
    // this.router.navigateByUrl('/Admin/auth/viewReport', { state: { type: value } });

    // to retrive data
    // this.report_data = this.route.getCurrentNavigation().extras.state.type;
  }

}
