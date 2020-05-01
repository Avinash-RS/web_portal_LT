import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { WcaService } from '../../services/wca.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  templateForm:FormGroup;
  submitted = true;

  constructor(
    public wcaService:WcaService,
    public spinner: NgxSpinnerService,
    @Optional() public dialogRef: MatDialogRef<DialogComponent>,
    public toast: ToastrService,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogdata,
    public dialog: MatDialog,
    public formbuilder:FormBuilder
  ) { }

  ngOnInit() {
    console.log(this.dialogdata);

    this.resetList()

    
    this.templateForm = this.formbuilder.group({
      tempName: [null,Validators.compose([Validators.required])]
    });
  }
  get formControls() { return this.templateForm.controls; }



  resetList() {
 
    // setTimeout(() => {
      if(this.dialogdata && this.dialogdata.images) {
        this.dialogdata.images = this.dialogdata.images.slice();
      }
    // }, 0);    
  }

  drop(event: CdkDragDrop<string[]>) {
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.dialogdata.images.push(this.dialogdata.images[event.previousIndex]);

      // transferArrayItem(event.previousContainer.data,
      //                   event.container.data,
      //                   event.previousIndex,
      //                   event.currentIndex);
    }
  }

  templateName() {
    console.log(this.templateForm);

    this.submitted = true;
    if (this.templateForm.valid) {
      this.submitted = false;
    this.dialogRef.close(this.templateForm.value);
    } else {
      this.toast.warning('Template Name Required !!!');
    }
  }

  dialogClose() {
    this.dialogRef.close(this.dialogdata.images)
  }

}
