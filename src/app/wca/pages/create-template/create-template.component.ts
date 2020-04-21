import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import { MatList } from '@angular/material';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import {WcaService} from '../../services/wca.service';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss']
})
export class CreateTemplateComponent implements OnInit {

  constructor(
    public wcaService:WcaService,
    public spinner: NgxSpinnerService,
    public toast: ToastrService,
    public router: Router,
  ) { }

  ngOnInit() {

    this.resetList()

  }

  todo = [
    {
      name:"PDF",
      image:"../../../../assets/images/pdf.svg"
    },
    {
      name:"Word",
      image:"../../../../assets/images/word.svg"
    },
    {
      name:"PPT",
      image:"../../../../assets/images/ppt.svg"
    },
    {
      name:"Image",
      image:"../../../../assets/images/image.svg"
    },
    {
      name:"Video",
      image:"../../../../assets/images/video.svg"
    },
    {
      name:"Audio",
      image:"../../../../assets/images/audio.svg"
    },
    {
      name:"SCROM",
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


  private resetList() {
    this.items2 = [];
    setTimeout(() => {
      this.items2 = this.todo.slice();
    }, 0);    
  }

  drop(event: CdkDragDrop<string[]>) {
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.done.push(this.items2[event.previousIndex]);

      // transferArrayItem(event.previousContainer.data,
      //                   event.container.data,
      //                   event.previousIndex,
      //                   event.currentIndex);
    }
  }
  

 
savedTemplates(type) {
  if(this.done.length) {
    console.log(this.done);
    if (type === 'saveTemplate') {

    } else {
      this.wcaService.bSubject.next({template_details:this.done});
      this.router.navigate(['./Wca/addtopic']);
    }
   } else {
     this.toast.warning('Atleast One Template is Required !!!');
   }

}
  

 

}
