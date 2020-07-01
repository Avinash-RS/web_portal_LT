import { Component, OnInit, Optional, Inject,ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { WcaService } from '../../services/wca.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { AngularEditorConfig } from '@kolkov/angular-editor';
declare var $: any;


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  templateForm:FormGroup;
  submitted = true;
  currentSlide: any;
  openEdior = false;
  editableImage;
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
    height: '100%',
    minHeight: '100%',
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

  constructor(
    public wcaService:WcaService,
    public spinner: NgxSpinnerService,
    @Optional() public dialogRef: MatDialogRef<DialogComponent>,
    public toast: ToastrService,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogdata,
    public dialog: MatDialog,
    public formbuilder:FormBuilder,
    private elem: ElementRef
  ) { }

  ngOnInit() {
    console.log(this.dialogdata);
    this.activeSlide(this.dialogdata.images[0])
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

  activeSlide(item){
    if(item){
      this.currentSlide = item
      setTimeout(()=>{
        $(".angular-editor-textarea").css('background-image', 'url(' + item.image + ')');
        this.editableImage = item;
      //   html2canvas($(".fr-element.fr-view")[0]).then(function(canvas) {
      //     var a = canvas.toDataURL();
      //     console.log(a)
      // });
      },1000)
    }
  }
  openEditorView(){
    this.openEdior = true;
    this.activeSlide(this.dialogdata.images[0])
  }
}
