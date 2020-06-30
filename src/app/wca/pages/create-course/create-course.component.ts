import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { WcaService } from '../../services/wca.service';
import { MatChipInputEvent, MatDialog } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { BlobReaderComponent } from '../blob-reader/blob-reader.component';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
    selector: 'app-create-course',
    templateUrl: './create-course.component.html',
    styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {

    @ViewChild('course_name') courseNameElem: ElementRef;

    editor = ClassicEditor;
    courseForm: FormGroup;
    imageView: File;
    submitted = false;
    preview1: any;
    preview2 = [];
    preview3 = [];
    preview4 = [];
    preRequisites = [];
    separatorKeysCodes = [ENTER, COMMA];
    // tslint:disable-next-line:variable-name
    author_details: FormArray;
    // tslint:disable-next-line:variable-name
    coursepartner_details: FormArray;
    // tslint:disable-next-line:variable-name
    takeway_details: FormArray;
    AllInstructors = [];
    AllTakeawayDetails = [];
    AllPrerequisitDetails = [];
    AllCertifyDetails = [];
    languages = ['English'];
    queryData: any;
    courseEditDetails: any;
    authorLengthArray = [];
    courseLengthArray = [];
    TakeAwayLengthArray = [];
    config: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        maxHeight: 'auto',
        width: 'auto',
        minWidth: '0',
        translate: 'yes',
        enableToolbar: true,
        showToolbar: true,
        placeholder: 'Enter text here...',
        defaultParagraphSeparator: '',
        defaultFontName: '',
        defaultFontSize: '',
        height: '15rem',
        minHeight: '5rem',
        fonts: [
            { class: 'arial', name: 'Arial' },
            { class: 'times-new-roman', name: 'Times New Roman' },
            { class: 'calibri', name: 'Calibri' },
            { class: 'comic-sans-ms', name: 'Comic Sans MS' }
        ],
        // customClasses: [
        //     {
        //         name: 'quote',
        //         class: 'quote',
        //     },
        //     {
        //         name: 'redText',
        //         class: 'redText'
        //     },
        //     {
        //         name: 'titleText',
        //         class: 'titleText',
        //         tag: 'h1',
        //     },
        // ]
        // defaultTextAlign: 'left'
    };
    isEditable: boolean;

    createItem(): FormGroup {
        this.preview2.push(null);
        return this.formBuilder.group({
            author_name: '',
            description: '',
            image: ''
        });
    }

    createItem1(): FormGroup {
        this.preview3.push(null);
        return this.formBuilder.group({
            name: '',
            image: ''
        });
    }

    createItem2(): FormGroup {
        return this.formBuilder.group({
            text: '',
            media: this.formBuilder.array(
                this.courseEditDetails && this.courseEditDetails.takeway_details && this.courseEditDetails.takeway_details[0] &&
                    this.courseEditDetails.takeway_details[0].media ?
                    this.courseEditDetails.takeway_details[0].media.map((data, index) => {
                        return this.createMedia();
                    }) : [this.createMedia()]),
            description: '',
            what_will_you_learn: ''

        });
    }
    createMedia(): FormControl {
        this.preview4.push(null);
        return this.formBuilder.control('');
    }
    constructor(
        public formBuilder: FormBuilder,
        public wcaService: WcaService,
        public spinner: NgxSpinnerService,
        public toast: ToastrService,
        public router: Router,
        public route: ActivatedRoute,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.isEditable = params.edit === undefined ? false : params.edit;
            let flag = 0;
            for (const key in params) {
                if (params.hasOwnProperty(key)) {
                    flag = 1;
                }
            }
            if (flag) {
                this.queryData = params;
                if (this.queryData && this.queryData.edit === 'true') {
                    this.updateFormCourse(this.queryData.viewingModule);
                    this.preview1 = 'image';
                } else {
                    this.courseForm = this.mainFormCreation();
                    this.courseForm.controls.pre_requisite.setValue(this.preRequisites);
                }
            } else {
            }
        });

        this.startup();
    }

    mainFormCreation(): FormGroup {
        return this.formBuilder.group({
            course_name: [null, Validators.compose([Validators.required])],
            course_description: [null, Validators.compose([])],
            course_long_description: [null, Validators.compose([])],
            course_img_url: [null, Validators.compose([Validators.required])],
            pre_requisite: [this.preRequisites, Validators.compose([])],
            preview_video: [null, Validators.compose([])],
            author_details: this.formBuilder.array(this.courseEditDetails && this.courseEditDetails.author_details &&
                this.courseEditDetails.author_details.length ? this.courseEditDetails.author_details.map((data, index) => {
                    return this.createItem();
                }) : [this.createItem()]),
            coursepartner_details: this.formBuilder.array(this.courseEditDetails && this.courseEditDetails.coursepartner_details &&
                this.courseEditDetails.coursepartner_details.length ? this.courseEditDetails.coursepartner_details.map((data, index) => {
                    return this.createItem1();
                }) : [this.createItem1()]),
            takeway_details: this.formBuilder.array([this.createItem2()]),
            certificate_name: [false],
            course_mode: [true],
            course_language: [null],
            feed_back: [false],
        });
    }

    get formControls() { return this.courseForm.controls; }

    add1(): void {
        this.author_details = this.courseForm.get('author_details') as FormArray;
        this.author_details.push(this.createItem());

    }

    removenewLink1() {
        if (this.author_details.length > 1) {
            this.author_details.removeAt(this.author_details.length - 1);
        }
    }


    add2(): void {
        this.coursepartner_details = this.courseForm.get('coursepartner_details') as FormArray;
        this.coursepartner_details.push(this.createItem1());

    }

    removenewLink2() {
        if (this.coursepartner_details.length > 1) {
            this.coursepartner_details.removeAt(this.coursepartner_details.length - 1);
        }
    }

    add3(): void {
        this.takeway_details = this.courseForm.get('takeway_details').get(String(0)).get('media') as FormArray;
        this.takeway_details.push(this.createMedia());

    }

    removenewLink3() {
        if (this.takeway_details.length > 1) {
            this.takeway_details.removeAt(this.takeway_details.length - 1);
        }
    }


    onSelectFile(fileInput: any, type, index, j = null) {
        let imagepath;
        const filePath = fileInput.target.files[0].name;
        const fileSize = fileInput.target.files[0].size;
        const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
        if (!allowedExtensions.exec(filePath)) {
            this.toast.warning('Please upload file having extensions .jpeg/.jpg/.png only.');
            fileInput.value = '';
            return false;
        } else if ((fileSize / 1024) / 1024 >= 2) {
            this.toast.warning('File size should not exceed more than 2 mb');
        } else {
            if (fileInput && fileInput.target && fileInput.target.files[0]) {
                this.spinner.show();
                const reader = new FileReader();
                this.imageView = fileInput.target.files[0];
                const formData = new FormData();
                // tslint:disable-next-line:no-unused-expression
                this.imageView.type === 'file';
                formData.append('image', this.imageView);
                this.wcaService.uploadImage(formData).subscribe((data: any) => {
                    imagepath = 'https://edutechstorage.blob.core.windows.net/' + data.Result.path;
                    this.spinner.hide();
                    reader.addEventListener('load', () => {
                        // convert image file to base64 string
                        if (type === 'img1') {
                            this.preview1 = reader.result;
                            this.courseForm.get('course_img_url').setValue(imagepath);
                        } else if (type === 'img2') {
                            this.courseForm.get('author_details').get(String(index)).get('image').setValue(imagepath);
                            this.preview2[index] = reader.result;
                        } else if (type === 'img3') {
                            this.courseForm.get('coursepartner_details').get(String(index)).get('image').setValue(imagepath);
                            this.preview3[index] = reader.result;
                        } else if (type === 'img4') {
                            this.courseForm.get('takeway_details').get(String(index)).get('media').get(String(j)).setValue(imagepath);
                            this.preview4[j] = reader.result;
                        }
                    }, false);

                    if (this.imageView) {
                        reader.readAsDataURL(this.imageView);
                    }

                }, err => {
                    this.spinner.hide();
                });

            }
        }

    }


    createcourseForm() {

        const userDetails = JSON.parse(localStorage.getItem('adminDetails'));
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
        this.courseForm.value.created_by = userDetails.username ? userDetails.username : '';
        this.courseForm.value.updated_by = '';
        this.courseForm.value.admin_id = userDetails.user_id ? userDetails.user_id : '';
        this.courseForm.value.is_published = null;
        this.courseForm.value.learner_count = null;
        this.courseForm.value.is_active = 0;
        this.courseForm.value.published_by = '';
        this.courseForm.value.publisher_id = '';
        this.courseForm.value.updated_by_id = '';






        if (!this.courseForm.value.course_name) {
            this.toast.warning('Mandatory fields should not be blank');
            return false;
        }

        if (!this.courseForm.value.course_img_url) {
            this.toast.warning('Mandatory fields should not be blank');
            return false;
        }

        if (!this.courseForm.value.course_description) {
            this.toast.warning('Mandatory fields should not be blank');
            return false;
        }
        if (this.courseForm.value.course_name && this.courseForm.value.course_img_url) {
            this.spinner.show();
            this.submitted = false;
            if (this.queryData && this.queryData.edit) {
                this.courseForm.value.course_id = this.queryData.viewingModule;
                this.wcaService.updateCourse(this.courseForm.value).subscribe((data: any) => {
                    if (data && data.success === true) {
                        this.toast.success('Course Updated Successfully !!!');
                        this.router.navigate(['/Admin/auth/Wca/addmodule'],
                            {
                                queryParams: {
                                    isCreate: false,
                                    courseId: this.queryData.viewingModule,
                                    courseImage: this.courseForm.value.course_img_url,
                                    courseName: this.courseForm.value.course_name
                                }
                            });

                    } else {
                        this.toast.error('Something Went Wrong While Updating !!!');
                    }

                    this.spinner.hide();
                }, err => {
                    this.spinner.hide();
                });
            } else {
                this.wcaService.createCourse(this.courseForm.value).subscribe((data: any) => {
                    this.spinner.hide();
                    if (data && data.course_id) {
                        const obj = {
                            coursename: this.courseForm.value.course_name,
                            coursefile: null,
                            coursestatus: 'true',
                            coursetype: '',
                            courseid: data.course_id,
                            coursedetails: [],
                            createdby_name: this.courseForm.value.user_name,
                            createdby_id: this.courseForm.value.user_id,
                            createdby_role: this.courseForm.value.user_role
                        };
                        // tslint:disable-next-line:no-shadowed-variable
                        this.wcaService.saveCourse(obj).subscribe((data: any) => {
                        });
                        this.toast.success('Course Created Successfully !!!');
                        this.router.navigate(['/Admin/auth/Wca/addmodule'],
                            {
                                queryParams: {
                                    isCreate: true,
                                    courseId: data.course_id,
                                    courseImage: this.courseForm.value.course_img_url,
                                    courseName: this.courseForm.value.course_name
                                }
                            });
                    }
                }, err => {
                    this.spinner.hide();
                });
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
        controller.updateValueAndValidity(); // <---- Here it is
        controller.markAsDirty();
    }

    addrequest(event: MatChipInputEvent) {
        const input = event.input;
        const value = event.value;
        if ((value.trim() !== '')) {
            this.courseForm.controls.pre_requisite.setErrors(null); // 1
            const tempprerequisits = this.courseForm.controls.pre_requisite.value; // 2
            tempprerequisits.push({ name: value.trim() });
            this.courseForm.controls.pre_requisite.setValue(tempprerequisits);
            if (this.courseForm.controls.pre_requisite.valid) { // 4
                this.courseForm.controls.pre_requisite.markAsDirty();
                input.value = ''; // 5
            } else {
                const index = this.preRequisites.findIndex(value1 => value1.name === value.trim());
                if (index !== -1) {
                    this.preRequisites.splice(index, 1); // 6
                }
            }
        } else {
            this.courseForm.controls.pre_requisite.updateValueAndValidity(); // 7
        }
    }

    startup() {
        this.wcaService.getAllPrerequisitDetails().subscribe((data: any) => {
            this.AllPrerequisitDetails = [];
            this.AllPrerequisitDetails = data.Result;
        });
        this.startup1();
    }

    startup1() {
        this.wcaService.getAllInstructors().subscribe((data: any) => {
            this.AllInstructors = [];
            this.AllInstructors = data.Result;
        });
        this.startup2();
    }

    startup2() {
        this.wcaService.getAllCertifyDetails().subscribe((data: any) => {
            this.AllCertifyDetails = [];
            this.AllCertifyDetails = data.Result;

        });
        this.startup3();
    }

    startup3() {
        this.wcaService.getAllTakeawayDetails().subscribe((data: any) => {
            this.AllTakeawayDetails = [];
            this.AllTakeawayDetails = data.Result;
        });
    }


    get selected() {
        return this.courseForm.get('author_details').value.map(i => {
            return i.author_name;
        });
    }

    get selected1() {
        return this.courseForm.get('coursepartner_details').value.map(i => {
            return i.name;
        });
    }

    change(name, index) {
        const option = this.AllInstructors.find(i => i.name === name);
        this.courseForm.get('author_details').get(String(index)).get('author_name').setValue(option.name);
        this.courseForm.get('author_details').get(String(index)).get('description').setValue(option.description);
        this.courseForm.get('author_details').get(String(index)).get('image').setValue(option.image);
    }


    change1(name, index) {
        const option = this.AllTakeawayDetails.find(i => i.name === name);
        this.courseForm.get('coursepartner_details').get(String(index)).get('name').setValue(option.name);
        this.courseForm.get('coursepartner_details').get(String(index)).get('image').setValue(option.image);
    }

    _handleKeydown(event) {
        return this.wcaService.handleKeydown(event);
    }


    updateFormCourse(courseid) {
        if (courseid) {
            this.spinner.show();
            const obj = {
                course_id: courseid,
            };
            this.wcaService.getcourseDetails(obj).subscribe((data: any) => {
                if (data && data.message) {
                    this.courseEditDetails = null;
                    this.courseEditDetails = data.message;
                    this.courseForm = this.mainFormCreation();
                    this.preRequisites = this.courseEditDetails.pre_requisite;
                    this.courseForm.controls.pre_requisite.setValue(this.preRequisites);
                    this.courseForm.patchValue(this.courseEditDetails);
                }
                this.spinner.hide();
            }, err => {
                this.spinner.hide();
            });
        }
    }

    loadBlobs() {
        const dialogRef = this.dialog.open(BlobReaderComponent, {
            data: { type: 'videos' },
            height: '70%',
            width: '90%',
            closeOnNavigation: true,
            disableClose: true,
        });
        dialogRef.afterClosed().subscribe(res => {
            if (res.url !== undefined) {
                this.courseForm.patchValue({ preview_video: res.url });
            }
        });
    }

    checkCourseName() {
        const courseName = this.courseForm.controls.course_name.value;
        if (this.isEditable) {
            if (courseName === this.courseEditDetails.course_name) {
                return;
            } else {
                if (courseName !== undefined || courseName !== null || courseName !== "") {
                    this.wcaService.checkCourseName_Availability(courseName).subscribe(res => {
                        if (!res.success) {
                            this.toast.warning(res.message);
                            this.courseForm.get('course_name').reset();
                            this.courseNameElem.nativeElement.focus();
                        }
                    });
                }
            }
        } 
        else if(courseName == ""){
            return;
        }else {
            if (courseName !== undefined || courseName !== null || courseName !== "") {
                this.wcaService.checkCourseName_Availability(courseName).subscribe(res => {
                    if (!res.success) {
                        this.toast.warning(res.message);
                        this.courseForm.get('course_name').reset();
                        this.courseNameElem.nativeElement.focus();
                    }
                });
            }
        }
    }


}
