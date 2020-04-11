import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import { MatList } from '@angular/material';
import { CdkDragStart, CdkDragMove, CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss']
})
export class CreateTemplateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @ViewChild(MatList, { read: ElementRef }) 
    
  child: ElementRef;

  _currentIndex;
  _currentField;

  types = [
    'image',
    'video',
    'html',
    'SCORM',
    'word'
  ]

  fields: string[] = [];

  dragStart(event: CdkDragStart) {
    // console.log(event.source.data,"############")
    this._currentIndex = this.types.indexOf(event.source.data); // Get index of dragged type
    this._currentField = this.child.nativeElement.children[this._currentIndex]; // Store HTML field
  }

  moved(event: CdkDragMove) {
    // Check if stored HTML field is as same as current field
    if (this.child.nativeElement.children[this._currentIndex] !== this._currentField) {
      // Replace current field, basically replaces placeholder with old HTML content
      this.child.nativeElement.replaceChild(this._currentField, this.child.nativeElement.children[this._currentIndex]);
    }
  }

  itemDropped(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
    } else {
      this.addField(event.item.data, event.currentIndex);
    }
  }

  addField(fieldType: string, index: number) {
    this.fields.splice(index, 0, fieldType)
  }

}
