import { Component, OnInit } from '@angular/core';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { Router } from '@angular/router';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { LearnerServicesService } from '@learner/services/learner-services.service';
@Component({
  selector: 'app-publish-course',
  templateUrl: './publish-course.component.html',
  styleUrls: ['./publish-course.component.scss']
})
export class PublishCourseComponent implements OnInit {
  course: any;
  show = false;
  pagenumber: any;
  categories: any;
  selectedCategory: any = {};
  selectedSubCategory: any = {};
  selectedSuperSubCategory: any = {};

  readonly dataSource$: BehaviorSubject<any[]>;
  readonly treeSource: MatTreeNestedDataSource<any>;
  /** tree control */
  readonly treeControl = new NestedTreeControl<any>(node => node.children);
  courseCount: any;
  readonly hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;

  constructor(public route: Router, private service: AdminServicesService, private gs: GlobalServiceService,
              private alert: AlertServiceService, public learnerservice: LearnerServicesService) {
    this.course = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras &&
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.detail);
    if (!this.course) {
      this.route.navigate(['/Admin/auth/Wca']);
    }
    this.treeSource = new MatTreeNestedDataSource<any>();
    this.dataSource$ = new BehaviorSubject<any[]>([]);
  }

  ngOnInit() {
    localStorage.setItem('role', 'admin');
    this.gs.checkLogout();
    this.getallcategories();
  }

  getallcategories() {
    this.selectedCategory = {};
    this.selectedSubCategory = {};
    this.selectedSuperSubCategory = {};
    this.treeSource.data = null;
    this.pagenumber = 0;
    this.service.getcategories(this.pagenumber).subscribe((result: any) => {
      this.treeSource.data = null;
      this.categories = result.data.getcategoryadmin.message;
      this.treeSource.data = this.categories;
      this.dataSource$.next(this.categories);
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

  selectedcategory(category) {
    console.log('inside');
    let oldcategory; let oldsubcategory; let oldsupersubcategory;
    if (category.category_id) {
      if (category.checkbox === true) {
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
        } else {
          this.resetAll();
        }
      }
    } else {
      if (category.checkbox === true) {
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
        } else if (this.selectedCategory?.category_name !== undefined) {
        } else {
          this.resetAll();
        }
      }
    }
  }

  publishCourse() {
    let level;
    if (this.selectedSuperSubCategory.super_sub_category_id !== undefined) {
      level = "3";
    } else if (this.selectedSuperSubCategory.super_sub_category_id === undefined && 
      this.selectedSubCategory.sub_category_id !== undefined) {
      level = "2";
    } else {
      level = "1";
    }

    this.alert.openConfirmAlert('Confirmation', 'Are you sure you want to publish the course ?').then((data) => {
      if (data) {
        console.log( true, level, this.selectedCategory.category_id, this.selectedSubCategory.sub_category_id,
          this.selectedSuperSubCategory.super_sub_category_id);
        this.service.publishCourse(this.course.id, true, level , this.selectedCategory.category_id,
          this.selectedSubCategory.sub_category_id || 'null', this.selectedSuperSubCategory.super_sub_category_id || 'null' )
          .subscribe((res: any) => {
          if (res.data && res.data.publishcourse) {
            if (res.data.publishcourse.success) {
              this.alert.openAlert('Course published successfully', null);
              this.route.navigate(['/Admin/auth/Wca']);
            } else {
              this.alert.openAlert(res.data.publishcourse.message === '' ? res.data.publishcourse.error_msg :
                res.data.publishcourse.message, null);
            }
          } else {
            this.alert.openAlert('Please try again later', null);
          }
        });
      } else {
        const detail = { type: 'create', id: this.course.course_id };
        this.route.navigateByUrl('/Admin/auth/Wca/previewcourse', { state: { detail } });
      }
    });
  }

  draftCourse() {
    this.route.navigate(['/Admin/auth/Wca']);
  }

  onScrollDown() {
    this.pagenumber = this.pagenumber + 1;
    this.service.getcategories(this.pagenumber).subscribe((result: any) => {
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

  resetAll() {
    this.selectedSubCategory = {};
    this.selectedCategory = {};
    this.selectedSuperSubCategory = {};
  }
}
