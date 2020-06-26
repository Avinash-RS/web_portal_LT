import { Component, OnInit, Optional, Inject,ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { WcaService } from '../../services/wca.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import 'froala-editor/js/plugins.pkgd.min.js';
import html2canvas from 'html2canvas';
import { element } from 'protractor';
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
  // public firstModel: any = {
  //   details: '<p>nothing inserted yet.</p><p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>'
  // };

  froalaOptions: Object = {
    toolbarSticky: true,
    imagePaste: false,
    zIndex: 9999,
    imageEditButtons: ['imageAlign', 'imageDisplay', 'imageStyle', 'imageSize'],
    toolbarButtons: {
               'moreParagraph': {
                   'buttons': ['insertContent', 'paragraphFormat', 'fontFamily', 'fontSize',
                    'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote', 'formatOLSimple',  'formatOL', 'formatUL'],
                    'buttonsVisible': 4
                 },
               'moreText': {
                 'buttons': ['bold', 'italic', 'underline', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle',  'strikeThrough', 'subscript', 'superscript',  'clearFormatting']
               },
               'moreFormat': {
                   'buttons': ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'],
                   'buttonsVisible': 4
                 },
               'moreRich': {
                 'buttons': ['insertTable', 'insertHR', 'emoticons','specialCharacters', 'embedly']
               },
               'moreMisc': {
                 'buttons': ['html', 'fullscreen', 'selectAll', 'undo', 'redo', 'help'],
                 'align': 'right',
                 'buttonsVisible': 2
               }
             },
             toolbarButtonsMD: {
              'moreParagraph': {
                'buttons': ['insertContent', 'paragraphFormat', 'fontFamily', 'fontSize',
                 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote', 'formatOLSimple',  'formatOL', 'formatUL'],
                 'buttonsVisible': 4
              },
               'moreText': {
                 'buttons': ['bold', 'italic', 'underline', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle',  'strikeThrough', 'subscript', 'superscript',  'clearFormatting'],
                 'buttonsVisible': 3
               },
               'moreFormat': {
                   'buttons': ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'],
                   'buttonsVisible': 4
                 },
               'moreRich': {
                 'buttons': ['insertTable','insertHR', 'emoticons', 'specialCharacters', 'embedly'],
                 'buttonsVisible': 2
               },
               'moreMisc': {
                  'buttons': ['html', 'fullscreen', 'selectAll', 'undo', 'redo', 'help'],
                 'align': 'right',
                 'buttonsVisible': 2
               }
            },
             toolbarButtonsSM: {
              'moreParagraph': {
                'buttons': ['insertContent', 'paragraphFormat', 'fontFamily', 'fontSize',
                 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote', 'formatOLSimple',  'formatOL', 'formatUL'],
                 'buttonsVisible': 4
              },
               'moreText': {
                 'buttons': ['bold', 'italic', 'underline', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle',  'strikeThrough', 'subscript', 'superscript',  'clearFormatting'],
                 'buttonsVisible': 2
               },
               'moreFormat': {
                   'buttons': ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'],
                   'buttonsVisible': 4
                 },
               'moreRich': {
                 'buttons': ['insertTable', 'insertHR', 'specialCharacters', 'embedly'],
                 'buttonsVisible': 2
               },
               'moreMisc': {
                  'buttons': ['html', 'fullscreen', 'selectAll', 'undo', 'redo', 'help'],
                 'align': 'right',
                 'buttonsVisible': 2
               }
             },
             toolbarButtonsXS: {
              'moreParagraph': {
                'buttons': ['insertContent', 'paragraphFormat', 'fontFamily', 'fontSize',
                 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote', 'formatOLSimple',  'formatOL', 'formatUL'],
                 'buttonsVisible': 4
              },
               'moreText': {
                 'buttons': ['bold', 'italic', 'underline', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle',  'strikeThrough', 'subscript', 'superscript',  'clearFormatting'],
                 'buttonsVisible': 1
               },
               'moreFormat': {
                   'buttons': ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'],
                   'buttonsVisible': 4
                 },
               'moreRich': {
                 'buttons': ['insertTable', 'insertHR', 'emoticons', 'specialCharacters', 'embedly'],
                 'buttonsVisible': 1
               },
               'moreMisc': {
                  'buttons': ['html', 'fullscreen', 'selectAll', 'undo', 'redo', 'help'],
                 'align': 'right',
                 'buttonsVisible': 2
               }
             },
    events: {
             'paste': function (images) {
               return false;
                 debugger;
                   //alert('hello');
               }
           }
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
        $(".fr-element.fr-view").css('background-image', 'url(' + item.image + ')');
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
