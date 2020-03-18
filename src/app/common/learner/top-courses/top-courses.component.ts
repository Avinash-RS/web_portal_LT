import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-courses',
  templateUrl: './top-courses.component.html',
  styleUrls: ['./top-courses.component.scss']
})
export class TopCoursesComponent implements OnInit {
  tiles: any = [];
  constructor() { }

  ngOnInit() {
    this.tiles = [
      { text: 'Tile 1', cols: 65671, rows: 15657 , img : "../../../../assets/learner/download.jpg"},
      { text: 'Tile 2', cols: 15765, rows: 15657,  img : "../../../../assets/learner/download.jpg"},
      { text: 'Tile 3', cols: 65671, rows: 15657,  img : "../../../../assets/learner/download.jpg"},
      { text: 'Tile 4', cols: 65671, rows: 15657,  img : "../../../../assets/learner/download.jpg"},
      { text: 'Tile 1', cols: 65671, rows: 15657, border: '0' , img : "../../../../assets/learner/download.jpg"},
      { text: 'Tile 2', cols: 65671, rows: 15657,  img : "../../../../assets/learner/download.jpg"},
      { text: 'Tile 3', cols: 65671, rows: 15657,  img : "../../../../assets/learner/download.jpg"},
      { text: 'Tile 4', cols: 65671, rows: 15657,  img : "../../../../assets/learner/download.jpg"},
      { text: 'Tile 3', cols: 65671, rows: 15657,  img : "../../../../assets/learner/download.jpg"},
      { text: 'Tile 4', cols: 65671, rows: 15657,  img : "../../../../assets/learner/download.jpg"},
      { text: 'Tile 1', cols: 65671, rows: 15657, border: '0' , img : "../../../../assets/learner/download.jpg"},
      { text: 'Tile 2', cols: 65671, rows: 15657,  img : "../../../../assets/learner/download.jpg"},
    ];
  }

}
