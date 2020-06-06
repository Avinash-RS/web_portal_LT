import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WcaService } from '../../services/wca.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as PDFJS from 'pdfjs-dist/build/pdf';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';
import { MatList, MatDialog } from '@angular/material';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatSlideToggleChange } from '@angular/material';
import { BlobReaderComponent } from '../blob-reader/blob-reader.component';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
declare var $: any;

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent implements OnInit {

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    if (this.isReload) {
      event.returnValue = false;
    }
    else {
      this.isReload = true;
    }
  }
  isReload = true;
  queryData: any;
  courseArray = [];
  courseDetails: any;
  query: any;
  submitted = false;
  active: any;
  createTopicForm: FormGroup;
  imageView: File;
  pdfImages = [];
  fileType: any;
  courseForm: FormGroup;
  displaySlides: any;
  questionPreData: any;
  subTitleVal = false;
  transcriptVal = false;
  showSubupload = false;
  showTransupload = false;
  isFileContent = false;
  urlRequired = false;
  videoUrl: any;
  selected = 'English';
  subtitles = [0];
  transcripts = [0];
  removeTemplateindex;
  @ViewChild('fileInput3') fileInput3;
  @ViewChild('fileInput4') fileInput4;
  @ViewChild('modName') modName;
  fileValidations = {
    Image: /(\.jpg|\.jpeg|\.png)$/i,
    PDF: /(\.pdf)$/i,
    Word: /(\.doc|\.docx)$/i,
    PPT: /(\.ppt|\.pptx)$/i,
    "Knowledge Check": /(\.csv)$/i,
    SCORM: /(\.imsmanifest)$/i,
    Video: /(\.vtt)$/i
  }

  fileValidations1 = {
    Image: "(.jpg .jpeg .png) are Allowed !!!",
    PDF: "(.pdf) are Allowed !!!",
    Word: "(.doc .docx) are Allowed !!!",
    PPT: "(.ppt .pptx) are Allowed !!!",
    Video: "",
    Audio: "are Allowed !!!",
    SCORM: "SCROM are Allowed !!!",
    "Knowledge Check": " (.csv) are Allowed !!!",
    Feedback: ""
  }

  feedBackFormHeading = ['Please take a moment to fill out the survey', '', '', '', '', '']
  feedBackForm = [{
    'title': 'Content',
    'star': ['1', '2', '3', '4', '5']
  },
  {
    'title': 'Relevance',
    'star': ['1', '2', '3', '4', '5']
  }, {
    'title': 'Ease of understanding',
    'star': ['1', '2', '3', '4', '5']
  }, {
    'title': 'Duration',
    'star': ['1', '2', '3', '4', '5']
  }]

  language = [{
    "code": "en",
    "name": "English"
  }]
  KnowledgeOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  courseform(): FormGroup {
    return this.formBuilder.group({
      coursename: [null, Validators.compose([Validators.required])],
      coursefile: [null],
      coursestatus: ['true'],
      coursetype: [null],
      courseid: [null, Validators.compose([Validators.required])],
      coursedetails: this.formBuilder.array(this.courseArray && this.courseArray.length ? this.courseArray.map((data, index) => {
        // if (data.modulestatus === 'true') {
        return this.createForm(data, index)
        // }
      }) : [])
      // }) : [this.createForm(this.queryData)])
    });
  }


  topicItem(mod_index, i): FormGroup {
    return this.formBuilder.group({
      topicname: [null, Validators.compose([Validators.required])],
      videosubtitle: ['false'],
      topicvalue: [''],
      topicimages: this.formBuilder.array(this.courseArray && this.courseArray.length && mod_index > -1 && this.courseArray[mod_index].moduledetails ? this.courseArray[mod_index].moduledetails[i].topicimages.map(data => {
        return this.topicImages()
      }) : [], Validators.compose([Validators.required])),
      topicstatus: ['true'],
      topictype: [null],
      topictime: [null, Validators.compose([Validators.required])]
      // topictime: [null, [Validators.required, Validators.pattern(/^(?:[0-9]{1,3}):(?:[012345]\d):(?:[012345]\d)$/)]]
    });
  }

  topicImages(): FormControl {
    return this.formBuilder.control("")
  }


  constructor(
    public spinner: NgxSpinnerService,
    public toast: ToastrService,
    public router: Router,
    public route: ActivatedRoute,
    private wcaService: WcaService,
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private alertService: AlertServiceService
  ) {

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
        this.query = null;
        this.query = params;
        if (this.query && this.query.temp && !this.query.addModule) {
          this.wcaService.bSubject.subscribe(value => {
            if (value) {
              this.queryData = null;
              this.queryData = value;
              this.courseForm = this.courseform()
              this.createTopicForm = this.createForm(this.queryData);
              (this.courseForm.get("coursedetails") as FormArray).push(this.createTopicForm)
              this.courseForm.patchValue({ coursename: this.query.courseName, courseid: this.query.viewingModule });
            }
          })
        } else if (this.query.edit && !this.query.addModule) {
          this.wcaService.bSubject1.subscribe((value1: any) => {
            if (value1 && value1.courseDetails) {
              this.courseArray = value1.courseDetails.coursedetails;
              this.queryData = value1.courseDetails.coursedetails[value1.index];
              this.courseForm = this.courseform()
              this.createTopicForm = this.courseForm.get("coursedetails").get(String(value1.index)) as FormGroup;
              this.courseForm.patchValue(value1.courseDetails);
            } else {
              this.queryData = {};
            }
          })
        } else if (this.query && this.query.template && this.query.addModule) {
          this.initialCal2(this.query);

        } else if (this.query && this.query.template && !this.query.addModule) {
          this.initialCall(this.query);
        } else if (this.query && this.query.temp && this.query.addModule) {
          this.initialCall3(this.query);
        }
      }
    })

  }
  createForm(mod, mod_index = -1): FormGroup {
    return this.formBuilder.group({
      modulename: [null, Validators.compose([Validators.required])],
      modulestatus: ['true'],
      template_details: [this.queryData.template_details],
      moduledetails: this.formBuilder.array(mod && mod.template_details && mod.template_details.length ? mod.template_details.map((data, index) =>
        this.topicItem(mod_index, index)
      ) : [])
    })

  }
  // createTopicForm => 


  initialCall(data1) {
    this.spinner.show();
    this.wcaService.getsingleTemplate(data1.template).subscribe((data: any) => {
      this.spinner.hide();
      this.queryData = data.Result;
      this.courseForm = this.courseform()
      this.createTopicForm = this.createForm(this.queryData);
      (this.courseForm.get("coursedetails") as FormArray).push(this.createTopicForm)
      this.courseForm.patchValue({ coursename: data1.courseName, courseid: data1.viewingModule });
    }, err => {
      this.spinner.hide();
    })
  }

  initialCal2(data1) {
    this.spinner.show();
    this.wcaService.getCourseDetails(this.query.viewingModule).subscribe((data: any) => {
      this.courseDetails = data.Result[0];
      this.courseArray = this.courseDetails.coursedetails;
      this.wcaService.getsingleTemplate(data1.template).subscribe((data: any) => {
        this.queryData = data.Result;
        this.spinner.hide();
        // this.queryData.moduledetails = this.courseArray[0].moduledetails;
        this.courseForm = this.courseform()
        this.createTopicForm = this.createForm(this.queryData);
        (this.courseForm.get("coursedetails") as FormArray).push(this.createTopicForm)
        this.courseForm.patchValue(this.courseDetails);
        // this.courseForm.updateValueAndValidity();

      }, err => {
        this.spinner.hide();
      })
    }, err => {
      this.spinner.hide();
    })
  }

  initialCall3(data1) {
    this.wcaService.getCourseDetails(this.query.viewingModule).subscribe((data: any) => {
      this.courseDetails = data.Result[0];
      this.courseArray = this.courseDetails.coursedetails;
      this.wcaService.bSubject.subscribe(value => {
        if (value) {
          this.queryData = null;
          this.queryData = value;
          this.spinner.hide();
          //  this.queryData.moduledetails = this.courseArray[0].moduledetails;
          this.courseForm = this.courseform()
          this.createTopicForm = this.createForm(this.queryData);
          (this.courseForm.get("coursedetails") as FormArray).push(this.createTopicForm)
          this.courseForm.patchValue(this.courseDetails);
          // this.courseForm.updateValueAndValidity();         
        }
      });
    }, err => {
      this.spinner.hide();
    })
  }

  DeleteTopic(jform, event) {
    event.stopPropagation();
    // let allModuleDetails = this.createTopicForm.get('moduledetails') as FormArray;
    //  allModuleDetails.removeAt(jform);
    $('#confirmModal').modal('show');
    $('#confirmModal').appendTo("body");
    this.removeTemplateindex = jform
    // this.createTopicForm.get('moduledetails').get(String(jform)).get('topicstatus').setValue('false');
    // this.queryData.template_details.splice(jform,1);
    // this.createTopicForm.get('template_details').setValue(this.queryData.template_details);
  }

  confirmDelete() {
    $('#confirmModal').modal('hide');
    var removedObj = {
      "file": "",
      "title": [""]
    }
    this.createTopicForm.get('moduledetails').get(String(this.removeTemplateindex)).get('topicstatus').setValue('false');
    this.createTopicForm.get('moduledetails').get(String(this.removeTemplateindex)).get('topictime').setValue('00:00:00');
    this.createTopicForm.get('moduledetails').get(String(this.removeTemplateindex)).get('topicname').setValue('false');
    if (!this.createTopicForm.get('moduledetails').get(String(this.removeTemplateindex)).get('topicimages').get(String(0))) {
      (this.createTopicForm.get('moduledetails').get(String(this.removeTemplateindex)).get('topicimages') as FormArray).push(this.topicImages());
    }
    this.createTopicForm.get('moduledetails').get(String(this.removeTemplateindex)).get('topicimages').get(String(0)).setValue(removedObj);
    this.createTopicForm.get('moduledetails').get(String(this.removeTemplateindex)).get('topictype').setValue('Deleted');

    var noModule = this.createTopicForm.value.moduledetails.filter((data) => {
      return data.topicstatus == "true"
    })

    if (noModule.length == 0) {
      this.router.navigate(['/Admin/auth/Wca/addmodule'],
        {
          queryParams: {
            courseId: this.query.viewingModule,
            courseImage: this.query.image,
            courseName: this.query.courseName
          }
        });
      $('#confirmModal').modal('hide');
    }

  }


  activate(item) {
    if (item) {
      this.active = item
      this.fileType = this.fileValidations1[item.name];
    }
  }

  // To unzip SCROM files 
  // handleFile(f) {
  // JSZip.loadAsync(f)                                  
  // .then(function(zip) {
  //     zip.forEach(function (data) { 
  //     });
  // });
  // this.spinner.hide();
  // }

  onSelectFile(fileInput: any, item, formdata: FormGroup, index, textvalue, subTitleindex) {
    if (item == undefined || item == null) {
      item = {}
      item.name = "Video"
    }
    if (fileInput && fileInput.target && fileInput.target.files && fileInput.target.files[0]) {
      this.spinner.show();
      var imagepath;
      var allowedExtensions;
      var filePath = fileInput.target.files[0].name;
      const reader = new FileReader()
      allowedExtensions = this.fileValidations[item.name];
      if (item.name != 'SCORM' && !allowedExtensions.exec(filePath)) {
        this.toast.warning('Please upload file having extensions ' + this.fileValidations1[item.name]);
        this.spinner.hide();
        fileInput.value = '';
        if (this.fileInput3) {
          this.fileInput3.nativeElement.value = '';
        }
        if (this.fileInput4) {
          this.fileInput4.nativeElement.value = '';
        }
        return false;
      }
      else if (item.name == 'SCORM') {
        this.spinner.show();
        let file = fileInput.target.files[0];
        let fileReader: FileReader = new FileReader();
        let that = this;
        that.isFileContent = false;
        fileReader.onloadend = function (x) {
          that.isFileContent = String(fileReader.result).includes("imsmanifest.xml") ? true : false;
          if (!that.isFileContent) {
            that.spinner.hide();
            that.toast.warning('Kindly upload a valid SCORM file');
            if (that.fileInput3) {
              that.fileInput3.nativeElement.value = '';
            }
          }
          else {
            that.imageView = fileInput.target.files[0];
            const formData = new FormData();
            formData.append('scrom', that.imageView);
            that.wcaService.uploadScromCourse(formData).subscribe((data: any) => {
              imagepath = 'https://edutechstorage.blob.core.windows.net/' + data.Result.path;
              let obj1 = {
                file: imagepath
              }
              if (!formdata.get('topicimages').get(String(0))) {
                (formdata.get('topicimages') as FormArray).push(that.topicImages());
              }
              formdata.get('topicimages').get(String(0)).setValue(obj1);
              formdata.get('topictype').setValue("Scorm");
              that.spinner.hide();
              that.toast.success('File uploaded sucessfully');
            }, err => {
              that.spinner.hide();
            })
          }
        }
        fileReader.readAsText(file);
      }
      else {
        if (fileInput.target && fileInput.target.files[0]) {
          this.imageView = null;
          this.imageView = fileInput.target.files[0];
          //this.imageView.type === 'file';
          if (item.name === 'Image') {
            const formData = new FormData();
            formData.append('image', this.imageView);
            this.wcaService.uploadImage(formData).subscribe((data: any) => {
              imagepath = 'https://edutechstorage.blob.core.windows.net/' + data.path;
              let obj1 = {
                name: '',
                image: imagepath,
                file: ''
              }
              if (!formdata.get('topicimages').get(String(0))) {
                (formdata.get('topicimages') as FormArray).push(this.topicImages());
              }
              formdata.get('topicimages').get(String(0)).setValue(obj1);
              formdata.get('topictype').setValue(item.name);
              this.spinner.hide();
              this.toast.success('File uploaded sucessfully');
            }, err => {
              this.spinner.hide();
            })
          } else if (item.name === 'PPT') {
            this.spinner.show();
            const formData1 = new FormData();
            formData1.append('reffile', this.imageView);
            this.wcaService.excelUpload(formData1).subscribe((data: any) => {
              if (data && data.success) {
                this.clearFormArray(formdata.get("topicimages") as FormArray)
                for (var m = 0; m < data.message.length; m++) {
                  let path = 'https://edutechstorage.blob.core.windows.net/' + data.message[m].path;
                  let obj2 = {
                    name: '',
                    image: path,
                    file: ''
                  }
                  if (!formdata.get('topicimages').get(String(m))) {
                    (formdata.get('topicimages') as FormArray).push(this.topicImages());
                  }
                  formdata.get('topicimages').get(String(m)).setValue(obj2);
                  formdata.get('topictype').setValue(item.name);
                }
              }
              this.spinner.hide();
              this.toast.success('File uploaded sucessfully');
            }, err => {
              this.spinner.hide();
            })
          } else if (item.name === 'Word') {
            const formData3 = new FormData();
            formData3.append('reffile', this.imageView);
            this.wcaService.excelUpload(formData3).subscribe((data: any) => {
              if (data && data.success) {
                this.clearFormArray(formdata.get("topicimages") as FormArray)
                for (var m = 0; m < data.message.length; m++) {
                  let path = 'https://edutechstorage.blob.core.windows.net/' + data.message[m].path;
                  let obj3 = {
                    name: '',
                    image: path,
                    file: ''
                  }
                  if (!formdata.get('topicimages').get(String(m))) {
                    (formdata.get('topicimages') as FormArray).push(this.topicImages());
                  }
                  formdata.get('topicimages').get(String(m)).setValue(obj3);
                  formdata.get('topictype').setValue(item.name);
                }
              }
              this.spinner.hide();
              this.toast.success('File uploaded sucessfully');
            }, err => {
              this.spinner.hide();
            })
          } 
          else if (item.name === 'PDF') {
            const formData5 = new FormData();
            formData5.append('pdf', this.imageView);
            this.wcaService.excelPpt(formData5).subscribe((data: any) => {
              if (data && data.Message == 'Success') {
                this.clearFormArray(formdata.get("topicimages") as FormArray)
                for (var m = 0; m < data.Result.length; m++) {
                  let path = data.Result[m];
                  let obj3 = {
                    name: '',
                    image: path,
                    file: ''
                  }
                  if (!formdata.get('topicimages').get(String(m))) {
                    (formdata.get('topicimages') as FormArray).push(this.topicImages());
                  }
                  formdata.get('topicimages').get(String(m)).setValue(obj3);
                  formdata.get('topictype').setValue(item.name);
                }
              }
              this.spinner.hide();
              this.toast.success('File uploaded sucessfully');
            }, err => {
              this.spinner.hide();
            })
          }
          else if (item.name === 'Video') {
            this.formVideo(formdata, "1", textvalue, subTitleindex)
          } else if (item.name === 'Knowledge Check') {
            this.spinner.show();
            const formData2 = new FormData();
            formData2.append('excel', this.imageView);
            this.wcaService.uploadKnowledgeCheck(formData2).subscribe((data: any) => {
              if (data && data.Message == "Success") {
                this.clearFormArray(formdata.get("topicimages") as FormArray)
                let path2 = 'https://edutechstorage.blob.core.windows.net/' + data.Result.path;
                let obj2 = {
                  name: '',
                  image: path2,
                  file: ''
                }
                this.previewKnowledgeCheck(path2, formdata, obj2);
              }
            }, err => {
              this.spinner.hide();
            })
            this.spinner.hide();
          }
        }
        // reader.addEventListener("load", () => {
        //   if (item.name === 'PDF') {
        //     this.demo(reader.result, formdata, index)
        //   }
        // }, false);

        if (fileInput.target.files[0]) {
          reader.readAsDataURL(fileInput.target.files[0]);
        }
      }
    }

    else if (item.name == 'Video') {
      this.formVideo(formdata, "2", textvalue, subTitleindex)
    }


  }



  async demo(pdf1, formdata: FormGroup, index) {

    var url = pdf1;

    var pages = [], heights = [], width = 0, height = 0, currentPage = 1;
    var scale = 1.5;

    PDFJS.disableWorker = true; // due to CORS




    let getPage = (pdf) => {
      pdf.getPage(currentPage).then((page) => {
        var viewport = page.getViewport({ scale });
        var canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
        var renderContext = { canvasContext: ctx, viewport: viewport };

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        page.render(renderContext).promise.then(async () => {
          pages.push(ctx.getImageData(0, 0, canvas.width, canvas.height));

          heights.push(height);
          height += canvas.height;
          if (width < canvas.width) width = canvas.width;

          if (currentPage < pdf.numPages) {
            currentPage++;
            getPage(pdf);
          }
          else {

            this.clearFormArray(formdata.get("topicimages") as FormArray)
            for (var m = 0; m < pages.length; m++) {
              let path = await this.imagedata_to_image(pages[m]);
              let obj3 = {
                name: '',
                image: path,
                file: ''
              }
              if (!formdata.get('topicimages').get(String(m))) {
                (formdata.get('topicimages') as FormArray).push(this.topicImages());
              }
              formdata.get('topicimages').get(String(m)).setValue(obj3);
              formdata.get('topictype').setValue('PDF');
            }
            this.spinner.hide();
            this.toast.success('File uploaded sucessfully');
          }
        });
      });

    }
    const pdf = await PDFJS.getDocument(url).promise
    getPage(pdf)
  }
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }

  }
  imagedata_to_image(imagedata) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = imagedata.width;
    canvas.height = imagedata.height;
    ctx.putImageData(imagedata, 0, 0);
    return new Promise(resolve => {
      canvas.toBlob((blob) => {
        var file = new File([blob], "name.png");
        const formData = new FormData();
        formData.append('image', file);
        this.wcaService.uploadImage(formData).subscribe((data: any) => {
          resolve('https://edutechstorage.blob.core.windows.net/' + data.path);
        }, err => {
          this.spinner.hide();
        })
      }, "image/png")
    })
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  formVideo(formdata, triggerFun, textvalue, subTitleindex) {
    if (textvalue) {
      formdata.get('topicvalue').setValue(textvalue);
    }
    if (triggerFun == "2") {
      if (!formdata.get('topicimages').get(String(0))) {
        (formdata.get('topicimages') as FormArray).push(this.topicImages());
        var vidObj = {
          "file": textvalue,
          "title": ["1"]
        }
        formdata.get('topicimages').get(String(0)).setValue(vidObj);
        formdata.get('topictype').setValue("Video");
        this.spinner.hide();
      }

    } else {
      const formData4 = new FormData();
      formData4.append('excel', this.imageView);
      this.spinner.show();
      this.wcaService.uploadKnowledgeCheck(formData4).subscribe((data: any) => {
        if (data && data.Message == "Success") {
          // this.clearFormArray(formdata.get("topicimages") as FormArray)
          let path2 = 'https://edutechstorage.blob.core.windows.net/' + data.Result.path;
          let valueFile = {
            "code": "en",
            "name": "English",
            "file": path2
          }
          if (!formdata.get('topicimages').get(String(0))) {
            (formdata.get('topicimages') as FormArray).push(this.topicImages());
          }
          var vidObj = {
            "file": textvalue,
            "title": ["1"]
          }
          if (formdata.value.topicimages.length == 0) {
            formdata.get('topicimages').get(String(0)).setValue(vidObj);
          }
          formdata.get('topictype').setValue("Video");
          formdata.value.topicimages[0].title[subTitleindex] = valueFile
          // this.vidObj.title.push(valueFile) 
          this.spinner.hide();
          this.toast.success('File uploaded sucessfully');
        }
      })
    }

  }

  addTopicFrom(event, type) {
    event.stopPropagation();
    if (this.modName.nativeElement.value) {
      var topicName = this.modName.nativeElement.value
      var index = this.courseForm.value.coursedetails.findIndex(x => x.modulename === topicName);
    }
    if (index == undefined) {
      index = 0
    }
    if (this.courseForm) {
      var repeatedVal = this.courseForm.value.coursedetails[index].moduledetails.reduce((a, e) => {
        a[e.topicname] = ++a[e.topicname] || 0;
        return a;
      }, {});
      var valueFind = this.courseForm.value.coursedetails[index].moduledetails.filter(e => repeatedVal[e.topicname])
    }
    if (valueFind.length > 0) {
      valueFind = valueFind.filter(e => e.topicname != 'false')
    }
    if (valueFind.length > 0) {
      this.toast.warning("Topic name cannot be same for templates");
      return false;
    }
    this.submitted = true;
    this.markFormGroupTouched(this.courseForm);
    if (this.query.edit || this.query.addModule) {
      this.courseForm.value.flag = 'false';
    } else {
      this.courseForm.value.flag = 'true';

    }
    var feedbackIndex = (<any>Object).values(this.courseForm['controls'].coursedetails['controls'][index]['controls']['template_details']['value']).findIndex(control => control.name == "Feedback");

    if (feedbackIndex >= 0) {
      var feedbackArray = this.courseForm['controls'].coursedetails['controls'][index]['controls']['moduledetails']['controls'][feedbackIndex];
      if (!feedbackArray.get('topicimages').get(String(0))) {
        (this.courseForm['controls'].coursedetails['controls'][index]['controls']['moduledetails']['controls'][feedbackIndex].get('topicimages') as FormArray).push(this.topicImages())
      }
      this.courseForm['controls'].coursedetails['controls'][index]['controls']['moduledetails']['controls'][feedbackIndex].get('topicimages').get(String(0)).setValue("");
      this.courseForm['controls'].coursedetails['controls'][index]['controls']['moduledetails']['controls'][feedbackIndex].get('topictype').setValue("Feedback");
    }

    // this.courseForm.value.coursedetails[index].template_details.filter((value)=>{
    //   if (value.name == "Video"){
    //     this.courseForm.get('topicvalue').setValidators([Validators.required]);
    //         this.courseForm.get('topicvalue').updateValueAndValidity()  
    //   }
    //   return
    // })
    // this.validateform(this.courseForm);
    if (this.courseForm.valid) {
      const userDetails = JSON.parse(localStorage.getItem('adminDetails'));
      this.courseForm.value.createdby_name = userDetails.username ? userDetails.username : '';
      this.courseForm.value.createdby_id = userDetails.user_id ? userDetails.user_id : '';
      this.courseForm.value.createdby_role = localStorage.getItem('role') ? localStorage.getItem('role') : '';
      this.spinner.show();
      this.submitted = false;

      this.wcaService.createDraft(this.courseForm.value).subscribe((data: any) => {
        if (data && data.Message === 'Success') {
          const obj = {
            course_id: this.query.viewingModule,
            is_active: 0
          }
          this.wcaService.updateCourse(obj).subscribe((data: any) => {
          });
          this.toast.success('Draft Created Successfully !!!');
          // if(type === 'draft') {
          //   this.router.navigate(['/Admin/auth/Wca/viewmodule']);
          // } else {
          //   this.router.navigate(['/Admin/auth/Wca']);
          // }
          this.alertService.openConfirmAlert('Do you want to add more modules', '').then((data: Boolean) => {
            if (data) {
              this.router.navigate(['/Admin/auth/Wca/addmodule'],
                {
                  queryParams: {
                    courseId: this.query.viewingModule,
                    courseImage: this.query.image,
                    courseName: this.query.courseName
                  }
                });

            }
            else {
              this.router.navigate(['/Admin/auth/Wca']);

            }
          })
        }
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      })

    } else {
      this.submitted = true;
    }


  }


  validateform(courseForm) {
    const invalid = [];
    const controls = courseForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
  previewimages(images, event, item) {
    event.stopPropagation();
    if (images && images.value && images.value.topicimages) {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: { type: 'previewImages', images: images.value.topicimages },
        height: '80%',
        width: '84%',
        closeOnNavigation: true,
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(res1 => {

        images.value.topicimages = res1;

      })
    } else {
      this.toast.warning('Something Went Wrong While Displaying Images !!!');
    }

  }

  openPreviewModal(value, index) {
    this.displaySlides = false;
    this.questionPreData = value.value.moduledetails[index].topicimages[0]
    $('#knowlegeCheckModal').modal('show');
    $('#knowlegeCheckModal').appendTo("body");
    setTimeout(() => {
      this.displaySlides = true
    }, 1000)
  }

  sampleDownload() {
    this.isReload = false;
    window.location.href = "https://edutechstorage.blob.core.windows.net/container1/knowledgecheck/408209727260479-MCQ Template.csv";
  }

  previewKnowledgeCheck(path, formdata, obj2) {
    this.wcaService.getPreviewData(path).subscribe((value) => {
      this.questionPreData = value['Result'];
      if (!formdata.get('topicimages').get(String(0))) {
        (formdata.get('topicimages') as FormArray).push(this.topicImages());
      }
      formdata.get('topicimages').get(String(0)).setValue(this.questionPreData);
      formdata.get('topictype').setValue('KnowledgeCheck');
      this.spinner.hide();
      this.toast.success('File uploaded sucessfully');
    })
    this.spinner.hide();
  }

  toggle_sub_trans(event, value, formdata) {
    if (value == "subtitle") {
      if (event.checked) {
        formdata.get('videosubtitle').setValue("True");
        if (!formdata.get('topicimages').get(String(0))) {
          (formdata.get('topicimages') as FormArray).push(this.topicImages());
        }
        if (!formdata.value.topicimages[0].file) {
          var vidObj = {
            "file": "",
            "title": ["1"]
          }
          formdata.get('topicimages').get(String(0)).setValue(vidObj);
        }

      }
      else {
        formdata.get('videosubtitle').setValue("false");

      }
    }
    // else{
    //   if(event.checked){
    //     this.showTransupload = true
    //   }
    //   else{
    //     this.showTransupload = false
    //   }
    // }
  }

  addSubTile(value, formdata, index) {

    var lastarray = formdata.value.topicimages[0].title.slice(-1)[0]
    if (!lastarray['code']) {
      this.toast.warning('Upload a file')
      return false;
    }
    if (value == 'sub') {
      formdata.value.topicimages[0].title.push((formdata.value.topicimages[0].title.length + 1).toString())
    }
    else {
      this.transcripts.push(this.transcripts.length)
    }
  }
  removeSubTile(index, value, formdata) {

    if (value == 'sub') {
      formdata.value.topicimages[0].title.splice(index, 1);
      return false;
    }
    else {
      this.transcripts.splice(index, 1);
    }
  }

  onCancel() {
    this.router.navigate(['/Admin/auth/Wca/addmodule'],
      {
        queryParams: {
          courseId: this.query.viewingModule,
          courseImage: this.query.image,
          courseName: this.query.courseName
        }
      });
  }

  openFeedback() {
    $('#feedbackModal').modal('show');
    $('#feedbackModal').appendTo("body");
  }

  loadBlobs(fileInput, item, formdata, index, textvalue) {
    const dialogRef = this.dialog.open(BlobReaderComponent, {
      data: {},
      height: '70%',
      width: '74%',
      closeOnNavigation: true,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res.url)
        this.onSelectFile(fileInput, item, formdata, index, res.url, '')
      else
        this.toast.warning('Try after sometime');
    });
  }

  isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 58))
      return false;
    return true;
  }
}