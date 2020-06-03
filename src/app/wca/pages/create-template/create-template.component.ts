import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import { MatList, MatDialog } from '@angular/material';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import {WcaService} from '../../services/wca.service';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss']
})
export class CreateTemplateComponent implements OnInit {
  queryData:any;
  breakpoint: any;

  constructor(
    public wcaService:WcaService,
    public spinner: NgxSpinnerService,
    public toast: ToastrService,
    public router: Router,
    public dialog: MatDialog,
    public route:ActivatedRoute,
    
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
      this.queryData = params;      
      }
    });

    this.resetList()

  }

  todo = [
    {
      name:"PDF",
      image:"../../../../assets/images/pdf.svg",
    },
    {
      name:"Word",
      image:"../../../../assets/images/word.svg",
    },
    { 
      name:"PPT",
      image:"../../../../assets/images/ppt.svg"
    },
    {
      name:"Image",
      image:"../../../../assets/images/image.svg",
    },
    {
      name:"Video",
      image:"../../../../assets/images/video.svg"
    },
    // {
    //   name:"Audio",
    //   image:"../../../../assets/images/audio.svg"
    // },
    {
      name:"SCORM",
      image:"../../../../assets/images/scrom.svg"
    },
    {
      name:"Knowledge Check",
      image:"../../../../assets/images/quiz.svg"
    },
    {
      name:"Feedback",
      image:"../../../../assets/images/feedback.svg"
    },
 

  ];

  items2: any[]

  done = [

    
  ];


  resetList() {
    this.items2 = [];
    setTimeout(() => {
      this.items2 = this.todo.slice();
    }, 0);    
  }

  drop(event: CdkDragDrop<string[]>) {
    if ((event.previousContainer === event.container)&&(event.previousContainer.id != "leftContainer" && event.container.id !="leftContainer")) {
      return false
    } 
    else if (event.previousContainer.id == "leftContainer" && event.container.id =="rightContainer"){
      return false;
    }
    else if (event.previousContainer.id == "leftContainer" && event.container.id =="leftContainer"){
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      this.done.push(this.items2[event.previousIndex]);

      // transferArrayItem(event.previousContainer.data,
      //                   event.container.data,
      //                   event.previousIndex,
      //                   event.currentIndex);
    }
  }
  

 
savedTemplates(type) {
  if(this.done.length) {
    if (type === 'saveTemplate') {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: { type: 'CreateTemplate' },
        height: 'auto',
        width: '400px',
        closeOnNavigation: true,
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(res1 => {
        if (res1 && res1.tempName) {
          this.spinner.show();
          const obj={
            name:res1.tempName,
            coursename:this.queryData.courseName,
            userid:"001",
            username:"Sathish",
            userrole:"admin",
            template_details:this.done
          }
         this.wcaService.createTemplate(obj).subscribe((data:any) => {
          this.spinner.hide();
          if (data && data.Message === 'Success') {
            this.toast.success('Template Saved successfully !!!');
            if(this.queryData && this.queryData.addModule) 
            {
              this.router.navigate(['/Admin/auth/Wca/addtopic'],{queryParams:{addModule:true,template:data.Result,viewingModule: this.queryData.viewingModule ,courseName:this.queryData.courseName}});
            } else {
              this.router.navigate(['/Admin/auth/Wca/addtopic'],{queryParams:{template:data.Result,viewingModule: this.queryData.viewingModule ,courseName:this.queryData.courseName}});
            }
          }
         },err => {
           this.spinner.hide();
         });
        } 
      });
    } else {
      this.wcaService.bSubject.next({template_details:this.done});
      if(this.queryData && this.queryData.addModule) 
      {
        this.router.navigate(['/Admin/auth/Wca/addtopic'],{queryParams:{addModule:true,temp:'noTempID',viewingModule: this.queryData.viewingModule ,courseName:this.queryData.courseName,isCreateTemp:true}});
      }else {
        this.router.navigate(['/Admin/auth/Wca/addtopic'],{queryParams:{temp:'noTempID',viewingModule: this.queryData.viewingModule ,courseName:this.queryData.courseName,isCreateTemp: true}});
      }
    }
   } else {
     this.toast.warning('Atleast One Template is Required !!!');
   }

}

onCancel() {
  this.router.navigate(['/Admin/auth/Wca/addmodule'],
  {
      queryParams: {
          courseId: this.queryData.viewingModule,
          courseImage: this.queryData.image,
          courseName: this.queryData.courseName
      }
  });
}
  
removeTemplate(i) {
   this.done.splice(i,1);
}
 

routeTo() {
  if(this.queryData && this.queryData.addModule) 
    {
      this.router.navigate(['/Admin/auth/Wca/choosetemplate'],{queryParams: { addModule:true,viewingModule: this.queryData.viewingModule ,courseName:this.queryData.courseName,image: this.queryData.image}});
    }else {
      this.router.navigate(['/Admin/auth/Wca/choosetemplate'],{queryParams: { viewingModule: this.queryData.viewingModule ,courseName:this.queryData.courseName,image: this.queryData.image}});
    }

}


}
