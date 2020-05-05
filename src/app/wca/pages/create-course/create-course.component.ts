import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormArray, FormControl } from '@angular/forms';
import {WcaService} from '../../services/wca.service';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {

  courseForm: FormGroup;
  imageView:File;
  submitted = false;
  preview1:any;
  preview2=[];
  preview3=[];
  preview4=[];
  preRequisites = [];
  separatorKeysCodes = [ENTER, COMMA];
  author_details:FormArray;
  coursepartner_details:FormArray;
  takeway_details:FormArray;
  AllInstructors = [];
  AllTakeawayDetails = [];
  AllPrerequisitDetails = [];
  AllCertifyDetails = [];
  languages=['English']
  queryData:any;
  courseEditDetails:any;

  createItem(): FormGroup {
    this.preview2.push(null)
    return this.formBuilder.group({
      author_name: '',
      description: '',
      image: ''
    });
  }


  createItem1(): FormGroup {
    this.preview3.push(null)
    return this.formBuilder.group({
      name: '',
      image: ''
    });
  }

  createItem2(): FormGroup {
    return this.formBuilder.group({
      text: '',
      media: this.formBuilder.array([ this.createMedia()]),
      description: '',
      what_will_you_learn:''

    });
  }
  createMedia() : FormControl{
    this.preview4.push(null)
    return this.formBuilder.control("")
  }
  constructor(
    public formBuilder: FormBuilder,
    public wcaService:WcaService,
    public spinner: NgxSpinnerService,
    public toast: ToastrService,
    public router: Router,
    public route: ActivatedRoute,
    private gs: GlobalServiceService,
  ) { 
    localStorage.setItem('role', 'admin');
    this.gs.checkLogout();
  }
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let flag = 0;
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          flag = 1;
        }
      }
      if (flag) {
      this.queryData = params;
      console.log(this.queryData)
      if ( this.queryData && this.queryData.edit) {
        this.updateFormCourse(this.queryData.viewingModule)
      }
      }
    });


    this.courseForm = this.formBuilder.group({
      course_name:[null,Validators.compose([Validators.required])],
      course_description:[null,Validators.compose([])],
      course_img_url:[null,Validators.compose([Validators.required])],
      pre_requisite:[this.preRequisites,Validators.compose([])],
      preview_video:[null,Validators.compose([])],
      author_details:this.formBuilder.array([ this.createItem()]),
      coursepartner_details:this.formBuilder.array([ this.createItem1()]),
      takeway_details:this.formBuilder.array([ this.createItem2()]),
      certificate_name:[null,Validators.compose([])],
      course_mode:[true],
      course_language:[null],
    });
    this.courseForm.controls.pre_requisite.setValue(this.preRequisites);
  
    // console.log(this.courseForm.value)

    this.startup();
  }
  
  get formControls() { return this.courseForm.controls; }
  
  add1(): void {
    this.author_details = this.courseForm.get('author_details') as FormArray;
    console.log(this.author_details)
    this.author_details.push(this.createItem());
  
  }

  removenewLink1() {
    if(this.author_details.length > 1) {
   this.author_details.removeAt(this.author_details.length - 1);
    }
  }


  add2(): void {
    this.coursepartner_details = this.courseForm.get('coursepartner_details') as FormArray;
    console.log(this.coursepartner_details)
    this.coursepartner_details.push(this.createItem1());
  
  }

  removenewLink2() {
    if(this.coursepartner_details.length > 1) {
   this.coursepartner_details.removeAt(this.coursepartner_details.length - 1);
    }
  }

  add3(): void {
    this.takeway_details = this.courseForm.get('takeway_details').get(String(0)).get("media") as FormArray;
    console.log(this.takeway_details)
    this.takeway_details.push(this.createMedia());
  
  }

  removenewLink3() {
    if(this.takeway_details.length > 1) {
   this.takeway_details.removeAt(this.takeway_details.length - 1);
    }
  }

  
  onSelectFile(fileInput:any,type,index,j=null) {
    var imagepath;
    var filePath = fileInput.target.files[0].name;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if(!allowedExtensions.exec(filePath)){
        this.toast.warning('Please upload file having extensions .jpeg/.jpg/.png only.');
        fileInput.value = '';
        return false;
    }else{
      if (fileInput && fileInput.target && fileInput.target.files[0]) {
        this.spinner.show();
        console.log(index);
        const reader =new FileReader()
        this.imageView = fileInput.target.files[0];
        const formData = new FormData();
        this.imageView.type === 'file';
         formData.append('image',this.imageView);
         this.wcaService.uploadImage(formData).subscribe((data: any) => {
             imagepath =  'https://edutechstorage.blob.core.windows.net/'+ data.path;
             this.spinner.hide();
         reader.addEventListener("load", ()=> {
          // convert image file to base64 string
          if (type === 'img1') {
            this.preview1= reader.result;
            this.courseForm.get('course_img_url').setValue(imagepath);
          } else if (type === 'img2') {
            this.courseForm.get('author_details').get(String(index)).get('image').setValue(imagepath)
            this.preview2[index]= reader.result;
          } else if (type === 'img3') {
            this.courseForm.get('coursepartner_details').get(String(index)).get('image').setValue(imagepath)
            this.preview3[index]= reader.result;
           } else if (type === 'img4') {
            this.courseForm.get('takeway_details').get(String(index)).get('media').get(String(j)).setValue(imagepath)
            this.preview4[j]= reader.result;
         }
        }, false);
    
        if (this.imageView) {
          reader.readAsDataURL( this.imageView );
        }
  
         }, err => {
           this.spinner.hide();
         });
    
      }
    }
   
  }


  createcourseForm() {
    console.log(this.courseForm.valid);
    console.log(this.courseForm);

    const userDetails  = this.gs.checkLogout();
    console.log(userDetails);
    console.log(localStorage.getItem('role'))
      this.submitted = true;

      // dummy data
      this.courseForm.value.course_mode = 'self-placed';
      this.courseForm.value.user_role = localStorage.getItem('role') ? localStorage.getItem('role') : '';
      this.courseForm.value.user_id = userDetails.user_id ? userDetails.user_id : '';
      this.courseForm.value.user_name = userDetails.username ? userDetails.username : '';
      this.courseForm.value.version = '';
      this.courseForm.value.location = '';
      this.courseForm.value.course_start_datetime = null;
      this.courseForm.value.course_end_datetime = null;
      this.courseForm.value.advertised_start = '';
      this.courseForm.value.course_video_url = '';
      this.courseForm.value.social_sharing_url = '';
      this.courseForm.value.certificate_display_behaviour = '';
      this.courseForm.value.certificates_show_before_end = '';
      this.courseForm.value.certificate_html_view_enabled = null;
      this.courseForm.value.has_any_active_web_certificate = null;
      this.courseForm.value.lowest_passing_grade = '';
      this.courseForm.value.mobile_available = '';
      this.courseForm.value.visible_to_staff_only = null;
      this.courseForm.value.enrollment_start = null;
      this.courseForm.value.enrollment_end = null;
      this.courseForm.value.invitation_only = null;
      this.courseForm.value.max_student_enrollments_allowed = null;
      this.courseForm.value.announcement = '';
      this.courseForm.value.catalog_visibility = null;
      this.courseForm.value.short_description = '';
      this.courseForm.value.self_paced = null;
      this.courseForm.value.marketing_url = '';
      this.courseForm.value.certificate_available_date = '';
      this.courseForm.value.course_content_details = [];
      this.courseForm.value.article_count = null;
      this.courseForm.value.downloadable_resource_count = null;
      this.courseForm.value.course_level = '';
      this.courseForm.value.step_towards = '';
      this.courseForm.value.rating = '';
      this.courseForm.value.price = '';
      this.courseForm.value.course_category = '';
      this.courseForm.value.course_type = '';
      this.courseForm.value.parent_sub_category_id = [];
      this.courseForm.value.category_id = [];
      this.courseForm.value.created_by = '';
      this.courseForm.value.updated_by = '';
      this.courseForm.value.admin_id = userDetails.user_id ? userDetails.user_id : '';
      this.courseForm.value.is_published = null;
      this.courseForm.value.learner_count = null;
      this.courseForm.value.is_active = 0;
      this.courseForm.value.published_by = '';
      this.courseForm.value.publisher_id = '';
      this.courseForm.value.updated_by_id = ''






      if (!this.courseForm.value.course_name) {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        this.toast.warning('Course Name is Required !!!');
        return false;
      }
 
      if (!this.courseForm.value.course_img_url) {
        this.toast.warning('Course Image is Required !!!');
        return false;
      }
      console.log(this.courseForm.value);

      if (this.courseForm.value.course_name && this.courseForm.value.course_img_url) {
      this.spinner.show();
      this.submitted = false;
      if (this.queryData && this.queryData.edit) {
        this.courseForm.value.course_id = this.queryData.viewingModule;
        this.wcaService.updateCourse(this.courseForm.value).subscribe((data:any) => {
          console.log(data);
          // if (0) {
          //   this.toast.success('Course Updated Successfully !!!');
          //   console.log(data.course_id,this.courseForm.value.course_img_url,this.courseForm.value.course_name)
          //   this.router.navigate(['/Admin/auth/Wca/viewmodule'],{ queryParams: { viewingModule:data.course_id ,image: this.courseForm.value.course_img_url,courseName:this.courseForm.value.course_name}});
          // } else {
          //   this.toast.error('Something Went Wrong While Updating !!!');
          // }
         
          this.spinner.hide();
        }, err => {
          this.spinner.hide();
        })  
    } else {
      this.wcaService.createCourse(this.courseForm.value).subscribe((data:any) => {
        console.log(data);
        this.spinner.hide();
        if (data && data.course_id) {
          const obj = {
            coursename: this.courseForm.value.course_name,
            coursefile: null,
            coursestatus: 'true',
            courseid:data.course_id,
            coursedetails: [],
            createdby_name: this.courseForm.value.user_name,
            createdby_id: this.courseForm.value.user_id,
            createdby_role: this.courseForm.value.user_role
            }
            console.log
          this.wcaService.createDraft(obj).subscribe((data:any) => {
            console.log(data);
          });
         this.toast.success('Course Created Successfully !!!');
         console.log(data.course_id,this.courseForm.value.course_img_url,this.courseForm.value.course_name)
         this.router.navigate(['/Admin/auth/Wca/viewmodule'],{ queryParams: { viewingModule:data.course_id ,image: this.courseForm.value.course_img_url,courseName:this.courseForm.value.course_name}});
        }
      }, err => {
        this.spinner.hide();
      })
    }
    } else {
      this.toast.warning('Something Went Wrong !!!');
    }
  } 


  onRemoverequest(prereq: any) {
    const controller = this.courseForm.controls.pre_requisite;
    const index = this.preRequisites.indexOf(prereq, 0);
    if (index > -1) {
      this.preRequisites.splice(index, 1);
    }
    controller.updateValueAndValidity();  // <---- Here it is
    controller.markAsDirty();
  }

  addrequest(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
    console.log(input);
    console.log(value)
    if ((value.trim() !== '')) {
      this.courseForm.controls.pre_requisite.setErrors(null);   // 1
      const tempprerequisits = this.courseForm.controls.pre_requisite.value; // 2
      tempprerequisits.push({name:value.trim()});
      console.log(tempprerequisits)
      this.courseForm.controls.pre_requisite.setValue(tempprerequisits);
      if (this.courseForm.controls.pre_requisite.valid) {              // 4
        this.courseForm.controls.pre_requisite.markAsDirty();
        input.value = '';                                    // 5
      } else {
        const index = this.preRequisites.findIndex(value1 => value1.name === value.trim());
        if (index !== -1) {
          this.preRequisites.splice(index, 1);           // 6
        }
      }
    } else {
      this.courseForm.controls.pre_requisite.updateValueAndValidity();  // 7
    }
  }

  startup() {
   this.wcaService.getAllPrerequisitDetails().subscribe((data: any) => {
    this.AllPrerequisitDetails = [];
    this.AllPrerequisitDetails = data.Result;
    console.log(this.AllPrerequisitDetails);
   })
   this.startup1();
  }

  startup1() {
    this.wcaService.getAllInstructors().subscribe((data: any) => {
      this.AllInstructors = [];
      this.AllInstructors = data.Result;
    console.log(this.AllInstructors);
     })
   this.startup2();
  }

  startup2() {
    this.wcaService.getAllCertifyDetails().subscribe((data: any) => {
      this.AllCertifyDetails = [];
      this.AllCertifyDetails = data.Result;
      console.log(this.AllCertifyDetails);

     })
    this.startup3();
  }

  startup3() {
    this.wcaService.getAllTakeawayDetails().subscribe((data: any) => {
      this.AllTakeawayDetails = [];
      this.AllTakeawayDetails = data.Result;
      console.log(this.AllTakeawayDetails);
     }) 
  }


  get selected(){
    return this.courseForm.get('author_details').value.map(i=>{
      // console.log(i)
      return i.author_name 
    })
  }

  get selected1(){
    return this.courseForm.get('coursepartner_details').value.map(i=>{
      // console.log(i)
      return i.name 
    })
  }

  change(name,index){
  let option = this.AllInstructors.find(i=> i.name===name)
  console.log(option);
  this.courseForm.get('author_details').get(String(index)).get('author_name').setValue(option.name);
  this.courseForm.get('author_details').get(String(index)).get('description').setValue(option.description);
  this.courseForm.get('author_details').get(String(index)).get('image').setValue(option.image);
  }

 
  change1(name,index){
    let option = this.AllTakeawayDetails.find(i=> i.name===name)
    this.courseForm.get('coursepartner_details').get(String(index)).get('name').setValue(option.name);
    this.courseForm.get('coursepartner_details').get(String(index)).get('image').setValue(option.image);
    }

    _handleKeydown(event) {
      return this.wcaService.handleKeydown(event);
    }
  

    updateFormCourse(courseid) {
      if(courseid) {
        this.spinner.show();
        const obj = {
          course_id : courseid,
        }
        this.wcaService.getcourseDetails(obj).subscribe((data:any) => {
          if (data && data.message) {
         this.courseEditDetails = null;
         this.courseEditDetails = data.message;
         console.log(this.courseEditDetails);
         console.log(this.courseForm);
         this.preRequisites = this.courseEditDetails.pre_requisite;
         console.log(this.preRequisites)
         this.courseForm.controls.pre_requisite.setValue(this.preRequisites);
         this.courseForm.patchValue(this.courseEditDetails);
          }
        this.spinner.hide();
        }, err => {
          this.spinner.hide();
        })
      }
      }
}
