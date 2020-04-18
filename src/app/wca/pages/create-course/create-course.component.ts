import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormArray, FormControl } from '@angular/forms';
import {WcaService} from '../../services/wca.service';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
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
  instructure_details:FormArray;
  coursepartner_details:FormArray;
  takeway_details:FormArray;
  AllInstructors = [];
  AllTakeawayDetails = [];
  AllPrerequisitDetails = [];
  AllCertifyDetails = [];


  createItem(): FormGroup {
    this.preview2.push(null)
    return this.formBuilder.group({
      name: '',
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
    this.preview4.push(null)
    return this.formBuilder.group({
      text: '',
      media: '',
      description: ''
    });
  }
  constructor(
    public formBuilder: FormBuilder,
    public wcaService:WcaService

  ) { }
  
  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      name:[null,Validators.compose([Validators.required])],
      description:[null,Validators.compose([])],
      image:[null,Validators.compose([])],
      prerequisit_details:[this.preRequisites,Validators.compose([])],
      preview_video:[null,Validators.compose([])],
      instructure_details:this.formBuilder.array([ this.createItem()]),
      coursepartner_details:this.formBuilder.array([ this.createItem1()]),
      takeway_details:this.formBuilder.array([ this.createItem2()]),
      certification:[null,Validators.compose([])],
      course_mode:[true]
    });
    this.courseForm.controls.prerequisit_details.setValue(this.preRequisites);
  
    // console.log(this.courseForm.value)

    this.startup();
  }
  
  get formControls() { return this.courseForm.controls; }
  
  add1(): void {
    this.instructure_details = this.courseForm.get('instructure_details') as FormArray;
    console.log(this.instructure_details)
    this.instructure_details.push(this.createItem());
  
  }

  removenewLink1() {
    if(this.instructure_details.length > 1) {
   this.instructure_details.removeAt(this.instructure_details.length - 1);
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
    this.takeway_details = this.courseForm.get('takeway_details') as FormArray;
    console.log(this.takeway_details)
    this.takeway_details.push(this.createItem2());
  
  }

  removenewLink3() {
    if(this.takeway_details.length > 1) {
   this.takeway_details.removeAt(this.takeway_details.length - 1);
    }
  }

  
  onSelectFile(fileInput:any,type,index,item:FormControl) {
    var imagepath;
    if (fileInput && fileInput.target && fileInput.target.files[0]) {
      console.log(index);
      const reader =new FileReader()
      this.imageView = fileInput.target.files[0];
      const formData = new FormData();
      this.imageView.type === 'file';
      console.log(this.imageView);
       formData.append('image',this.imageView);
       this.wcaService.uploadImage(formData).subscribe((data: any) => {
           imagepath =  'https://edutechstorage.blob.core.windows.net/'+ data.path;
       console.log(imagepath);
       console.log(type);
       reader.addEventListener("load", ()=> {
        // convert image file to base64 string
        if (type === 'img1') {
          this.preview1= reader.result;
          this.courseForm.get('image').setValue(imagepath);
        } else if (type === 'img2') {
          this.courseForm.get('instructure_details').get(String(index)).get('image').setValue(imagepath)
          this.preview2[index]= reader.result;
        } else if (type === 'img3') {
          this.courseForm.get('coursepartner_details').get(String(index)).get('image').setValue(imagepath)
          this.preview3[index]= reader.result;
         } else if (type === 'img4') {
          this.courseForm.get('takeway_details').get(String(index)).get('media').setValue(imagepath)
          this.preview4[index]= reader.result;
       }
      }, false);
  
      if (this.imageView) {
        reader.readAsDataURL( this.imageView );
      }

       });
  
    }
  }


  createcourseForm() {
    console.log(this.courseForm.value);
      this.submitted = true;

      // dummy data
      this.courseForm.value.course_mode = 'self-placed';
      this.courseForm.value.user_role = 'Admin';
      this.courseForm.value.user_id = '0001';
      this.courseForm.value.user_name = 'Sathish';


    if (this.courseForm.valid) {
      this.submitted = false;
      console.log(this.courseForm.value);
      this.wcaService.createCourse(this.courseForm.value).subscribe((data:any) => {
        console.log(data);
      })
    }
  } 


  onRemoverequest(prereq: any) {
    const controller = this.courseForm.controls.prerequisit_details;
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
    if ((value.trim() !== '')) {
      this.courseForm.controls.prerequisit_details.setErrors(null);   // 1
      const tempprerequisits = this.courseForm.controls.prerequisit_details.value; // 2
      tempprerequisits.push({name:value.trim()});
      this.courseForm.controls.prerequisit_details.setValue(tempprerequisits);
      if (this.courseForm.controls.prerequisit_details.valid) {              // 4
        this.courseForm.controls.prerequisit_details.markAsDirty();
        input.value = '';                                    // 5
      } else {
        const index = this.preRequisites.findIndex(value1 => value1.name === value.trim());
        if (index !== -1) {
          this.preRequisites.splice(index, 1);           // 6
        }
      }
    } else {
      this.courseForm.controls.prerequisit_details.updateValueAndValidity();  // 7
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

}
