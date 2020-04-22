import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { WcaService } from '../../services/wca.service';

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
    this.templateForm = this.formbuilder.group({
      tempName: [null,Validators.compose([Validators.required])]
    });
  }
  get formControls() { return this.templateForm.controls; }


  templateName() {
    console.log(this.templateForm);

    this.submitted = true;
    if (this.templateForm.valid) {
      this.submitted = false;
    this.dialogRef.close(this.templateForm.value);
    } else {
      console.log("@@@@@@@@@@@@@@")
    }
  }

  dialogClose() {
    this.dialogRef.close('noData')
  }

}
