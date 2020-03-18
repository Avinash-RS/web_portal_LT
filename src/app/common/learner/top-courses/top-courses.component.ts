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
      { text: 'Tile 1', cols: 2, rows: 1, border: '3px double purple' },
      { text: 'Tile 2', cols: 2, rows: 1, border: '3px double red' },
      { text: 'Tile 3', cols: 2, rows: 1, border: '3px double skyblue' },
      { text: 'Tile 4', cols: 2, rows: 1, border: '3px double yellow' },
    ];
  }

}
