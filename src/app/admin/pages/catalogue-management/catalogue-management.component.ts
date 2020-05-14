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
@Component({
  selector: 'app-catalogue-management',
  templateUrl: './catalogue-management.component.html',
  styleUrls: ['./catalogue-management.component.scss']
})
export class CatalogueManagementComponent implements OnInit {

  addCategoryForm: any; // cat add from
  addSubCategoryForm: any; // sub cat add form
  selectCategoryForm: any; // popop - selct category form
  adminDetails: any;
  loading: boolean = false;
  showHome: boolean = false;
  showAddCatForm: boolean = false;
  showAddSubCatForm: boolean = false;
  showCourses: boolean = true;
  selectedCategory: any = null;
  selectedSubCategory: any = null;
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
    this.pagenumber = 0;
    this.adminservice.getcategories(this.pagenumber).subscribe((result: any) => {
      console.log(result.data);
    });
    // this.treeSource.data = this.categories;
    // this.dataSource$.next(this.categories);

  }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
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
          const fb = new FormData();
          fb.append('image', selectfile, selectfile.name)
          this.learnerservice.imageupload(fb).subscribe((data: any) => {
            var split_url = data.url.split('/');
            var upload_url = split_url[0] + "//" + split_url[1] + split_url[2] + '/' + data.path
            this.addCategoryForm.controls['categoryImage'].setValue(upload_url);
            this.loading = false;
          })
        }
      }
    }
  }

  gotoEdit() {
  }

  gotoDelete() {
  }

  selectAll() {
  }

  hideCourses() {
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

    var value = this.addCategoryForm.value;
    let category = {
      input_name: value.categoryName,
      input_description: value.categoryDescription,
      input_image: value.categoryImage,
      creator_id: this.adminDetails._id,
      level: 1,
      apply_all_courses: false,
      course_id: [],
      parent_category_id: "null",
      parent_sub_category_id: "null",
    }
    console.log(category)
    this.adminservice.createCatalogue(category).subscribe((result: any) => {
      console.log(result)
    });
  }
  // gotoedit() {
  //   this.learnerservice.getallcourses(this.userDetailes.group_id[0], this.pagenumber).subscribe((result: any) => {
  //     this.allcourses = result.data.get_all_course_by_usergroup.message;
  //   });
  // }

  // 5eb3b5f50d03e1bc320162cd id 

  selectCourse(c, id) {
    console.log(c, id);
    if (c.isChecked == undefined || c.isChecked == false) {
      c.isChecked = true;
      this.selectedArray.push(c);
    }
    else {
      c.isChecked = !c.isChecked;
      this.selectedArray = this.selectedArray.filter(i => i !== c);
    }
    console.log(this.selectedArray)
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
