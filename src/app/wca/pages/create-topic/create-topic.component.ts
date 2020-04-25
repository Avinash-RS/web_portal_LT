import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WcaService } from '../../services/wca.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
// import * as PDFJS from 'pdfjs';
import * as PDFJS from 'pdfjs-dist/build/pdf';
import {FormBuilder, FormGroup, Validators,FormArray, FormControl } from '@angular/forms';


@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent implements OnInit {
  queryData:any;
  active:any;
  createTopicForm:FormGroup;
  imageView:File;
  
  fileValidations={
    Image:/(\.jpg|\.jpeg|\.png)$/i,
    PDF:/(\.pdf)$/i,
    Word:/(\.doc|\.docx)$/i,
     }

  // moduleItem(): FormGroup {
  //   return this.formBuilder.group({
  //     modulename: '',
  //     moduledetails: this.formBuilder.array([this.topicItem()])
  //   });
  // }
 courseform(): FormGroup {
  return this.formBuilder.group({
    coursename: "test",
  courseid: "001",
  coursedetails:this.formBuilder.array([this.createTopicForm])
    }); 
 }


  topicItem(): FormGroup {
    return this.formBuilder.group({
    topicname:'',
    topicimages:this.formBuilder.array([this.topicImages()])
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

    ) { }

  ngOnInit() {
 
    this.createTopicForm = this.formBuilder.group({
      // coursename:[null,Validators.compose([Validators.required])],
      // courseid:[null,Validators.compose([Validators.required])],
      // coursedetails:this.formBuilder.array([ this.moduleItem()])
      modulename: [null,Validators.compose([Validators.required])],
      moduledetails: this.formBuilder.array([this.topicItem()])
    })



///////////////////////////////////////////////////////
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
      if(query && query.temp) {
        this.wcaService.bSubject.subscribe(value => {
           this.queryData = value;
           console.log(this.queryData);
         })
      } else {
        this.initialCall(query);
      }
      }
    });

 console.log(PDFJS)
  // this.demo();
  }
 
  initialCall(data) {
    this.spinner.show();
   console.log(data.template);
   this.wcaService.getsingleTemplate(data.template).subscribe((data:any)=> {
    this.spinner.hide();
   console.log(data);
   this.queryData = data.Result;
   }, err => {
     this.spinner.hide();
   })
  }
 
  activate(item){
    this.active=item
  }
 
  onSelectFile(fileInput:any,item,formdata:FormGroup) {
    console.log(item);
    var imagepath;
    var allowedExtensions;
    var filePath = fileInput.target.files[0].name;
    const reader =new FileReader()

    console.log(fileInput.target.files[0])
    allowedExtensions = this.fileValidations[item.name];
    if(!allowedExtensions.exec(filePath)){
        this.toast.warning('Please upload file having extensions '+ allowedExtensions +'only.');
        fileInput.value = '';
        return false;
    }else{
      if (fileInput && fileInput.target && fileInput.target.files[0]) { 
        if (item.name === 'Image') {
          console.log(formdata);
          this.imageView = fileInput.target.files[0];
          const formData = new FormData();
          this.imageView.type === 'file';
           formData.append('image',this.imageView);
           this.wcaService.uploadImage(formData).subscribe((data: any) => {
            imagepath =  'https://edutechstorage.blob.core.windows.net/'+ data.path;
            formdata.get('topicimages').get(String(0)).setValue(imagepath);
            this.spinner.hide();
          })
        }
      }
    }

    reader.addEventListener("load", ()=> {
     console.log(reader.result);
     if(item.name === 'PDF') {
      this.demo(reader.result)
     }
    }, false);

    if (fileInput.target.files[0]) {
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  

async demo(pdf1) {

  var url = pdf1;

var pages = [], heights = [], width = 0, height = 0, currentPage = 1;
var scale = 1.5;

  PDFJS.disableWorker = true; // due to CORS




let getPage=(pdf)=> {
  pdf.getPage(currentPage).then((page)=> {
      console.log("Printing " + currentPage);
      var viewport = page.getViewport({scale});
      var canvas = document.createElement('canvas') , ctx = canvas.getContext('2d');
      var renderContext = { canvasContext: ctx, viewport: viewport };

      canvas.height = viewport.height;
      canvas.width = viewport.width;
      console.log('asdf')

      page.render(renderContext).promise.then(() =>{
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
              // draw();
              console.log(pages)
          const uv =this.imagedata_to_image(pages[0]);
          console.log(uv)
          }
      });
  });

}
const pdf = await PDFJS.getDocument(url).promise
getPage(pdf)
}

 imagedata_to_image(imagedata) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = imagedata.width;
  canvas.height = imagedata.height;
  ctx.putImageData(imagedata, 0, 0);

  // var image = new Image();
  // image.src = canvas.toDataURL();
   canvas.toBlob((blob)=>{
console.log(blob)
var file = new File([blob], "name.png");
const formData = new FormData();
formData.append('image',file);
this.wcaService.uploadImage(formData).subscribe((data: any) => {
 console.log(data)
})
  },"image/png")
  return "asdgf"

}



addTopicFrom() {
  console.log(this.courseform().value);
}

}
