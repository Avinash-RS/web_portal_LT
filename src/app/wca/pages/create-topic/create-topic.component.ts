import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WcaService } from '../../services/wca.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as PDFJS from 'pdfjs-dist/build/pdf';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';
import { MatList, MatDialog } from '@angular/material';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent implements OnInit {
  queryData: any;
  submitted = false;
  active: any;
  createTopicForm: FormGroup;
  imageView: File;
  pdfImages = [];
  fileType: any;
  courseForm: FormGroup;
  fileValidations = {
    Image: /(\.jpg|\.jpeg|\.png)$/i,
    PDF: /(\.pdf)$/i,
    Word: /(\.doc|\.docx)$/i,
  }

  fileValidations1 = {
    Image: "(.jpg .jpeg .png) are Allowed !!!",
    PDF: "(.pdf) are Allowed !!!",
    Word: "(.doc .docx) are Allowed !!!",
    PPT: "are Allowed !!!",
    Video: " are Allowed !!!",
    Audio: "are Allowed !!!",
    SCROM: " are Allowed !!!",
    "Knowledge Check": " are Allowed !!!",
    Feedback: " are Allowed !!!"
  }

  courseform(): FormGroup {
    return this.formBuilder.group({
      coursename: [null, Validators.compose([Validators.required])],
      coursefile: [null],
      coursestatus: ['true'],
      courseid: [null, Validators.compose([Validators.required])],
      coursedetails: this.formBuilder.array([this.createForm()])
    });
  }


  topicItem(): FormGroup {
    return this.formBuilder.group({
      topicname: [null, Validators.compose([Validators.required])],
      topicimages: this.formBuilder.array([],Validators.compose([Validators.required])),
      topicstatus:['true']
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
  ) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let flag = 0;
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          flag = 1;
        }
      }
      if (flag) {
        const query = params;
        console.log(query)
        if (query && query.temp) {
          this.wcaService.bSubject.subscribe(value => {
            this.queryData = value;
            this.courseForm = this.courseform()
            this.courseForm.patchValue({ coursename:query.courseName, courseid:query.viewingModule});
            console.log(this.queryData);
          })
        } else {
          this.initialCall(query);
        }
      }
    });



  }
  createForm() {
   return this.createTopicForm = this.formBuilder.group({
      modulename: [null, Validators.compose([Validators.required])],
      modulestatus:['true'],
      moduledetails: this.formBuilder.array(this.queryData && this.queryData.template_details ? this.queryData.template_details.map(data =>
        this.topicItem()
      ) : [])
    })
  }


  initialCall(data1) {
    this.spinner.show();
    console.log(data1);
    this.wcaService.getsingleTemplate(data1.template).subscribe((data: any) => {
      this.spinner.hide();
      this.queryData = data.Result;
      this.courseForm = this.courseform()
      this.courseForm.patchValue({ coursename:data1.courseName, courseid:data1.viewingModule});
      console.log(this.queryData);
    }, err => {
      this.spinner.hide();
    })
  }

  activate(item) {
    console.log(item);
    this.active = item
    this.fileType = this.fileValidations1[item.name];

  }

  onSelectFile(fileInput: any, item, formdata: FormGroup, index) {
    console.log(item);
    if (fileInput && fileInput.target && fileInput.target.files && fileInput.target.files[0]) {
      this.spinner.show();
      var imagepath;
      var allowedExtensions;
      var filePath = fileInput.target.files[0].name;
      const reader = new FileReader()

      console.log(fileInput.target.files[0])
      allowedExtensions = this.fileValidations[item.name];
      if (!allowedExtensions.exec(filePath)) {
        this.toast.warning('Please upload file having extensions ' + allowedExtensions + 'only.');
        this.spinner.hide();
        fileInput.value = '';
        return false;
      } else {
        if (fileInput && fileInput.target && fileInput.target.files[0]) {
          if (item.name === 'Image') {
            console.log(formdata);
            this.imageView = fileInput.target.files[0];
            const formData = new FormData();
            this.imageView.type === 'file';
            formData.append('image', this.imageView);
            this.wcaService.uploadImage(formData).subscribe((data: any) => {
              imagepath = 'https://edutechstorage.blob.core.windows.net/' + data.path;
              formdata.get('topicimages').get(String(0)).setValue(imagepath);
              this.spinner.hide();
            }, err => {
              this.spinner.hide();
            })
          } else if (item.name === 'PPT') {


            this.spinner.hide();
          } else if (item.name === 'Word') {
            this.spinner.hide();
          } else if (item.name === 'Video') {
            this.spinner.hide();
          } else if (item.name === 'Audio') {
            this.spinner.hide();
          } else if (item.name === 'SCROM') {
            this.spinner.hide();
          } else if (item.name === 'Knowledge Check') {
            this.spinner.hide();
          } else if (item.name === 'Feedback') {
            this.spinner.hide();
          }
        }
      }

      reader.addEventListener("load", () => {
        console.log(reader.result);
        if (item.name === 'PDF') {
          this.demo(reader.result, formdata, index)
        }
      }, false);

      if (fileInput.target.files[0]) {
        reader.readAsDataURL(fileInput.target.files[0]);
      }
    }
  }



  async demo(pdf1, formdata: FormGroup, index) {

    var url = pdf1;

    var pages = [], heights = [], width = 0, height = 0, currentPage = 1;
    var scale = 1.5;

    PDFJS.disableWorker = true; // due to CORS




    let getPage = (pdf) => {
      pdf.getPage(currentPage).then((page) => {
        console.log("Printing " + currentPage);
        var viewport = page.getViewport({ scale });
        var canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
        var renderContext = { canvasContext: ctx, viewport: viewport };

        canvas.height = viewport.height;
        canvas.width = viewport.width;
        console.log('asdf')

        page.render(renderContext).promise.then(async () => {
          console.log('asdf')
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
            console.log(pages)
            for (var m = 0; m < pages.length; m++) {
              let path = await this.imagedata_to_image(pages[m]);
              if (!formdata.get('topicimages').get(String(m))) {
                (formdata.get('topicimages') as FormArray).push(this.topicImages());
              }
              formdata.get('topicimages').get(String(m)).setValue(path);
            }
            this.spinner.hide();
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
          // console.log(data)
          resolve('https://edutechstorage.blob.core.windows.net/' + data.path);
        }, err => {
          this.spinner.hide();
        })
      }, "image/png")
    })
  }



  addTopicFrom(event,type) {
    event.stopPropagation();
    this.submitted = true;
    // dummy data
     this.courseForm.value.createdby_name = 'Admin';
     this.courseForm.value.createdby_id = '0001';
     this.courseForm.value.createdby_role = 'Sathish';
     this.courseForm.value.flag = 'true';

    console.log(this.courseForm);
    return
    if(this.courseForm.valid) {
      this.spinner.show();
      this.submitted = false;

      this.wcaService.createDraft(this.courseForm.value).subscribe((data:any) => {
        console.log(data);
        if (data && data.Message === 'Success') {
          this.toast.success('Draft Created Successfully !!!');
          if(type === 'draft') {
            this.router.navigate(['./Wca/viewmodule']);
          } else {
            this.router.navigate(['./Wca']);
          }
        }
        this.spinner.hide();
     }, err => {
       this.spinner.hide();
     })

    } else {
      this.submitted = true;
    }
  
   
  }

  previewimages(images, event,item) {
    console.log(item);
    console.log(images);
    event.stopPropagation();
    console.log(images.value.topicimages);
    if (images && images.value && images.value.topicimages) {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: { type: 'previewImages', images: images.value.topicimages },
        height: '80%',
        width: '80%',
        closeOnNavigation: true,
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(res1 => {
        console.log(res1);
      })
    } else {
      this.toast.warning('Something Went Wrong While Displaying Images !!!');
    }

  }

}
