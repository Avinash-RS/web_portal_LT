import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activitycenterhomescreen',
  templateUrl: './activitycenterhomescreen.component.html',
  styleUrls: ['./activitycenterhomescreen.component.scss']
})
export class ActivitycenterhomescreenComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  gototable1() {

    this.router.navigateByUrl('/Learner/activitycenter');
  }
  gototable(e) {
    console.log(e, 'ee');
    const detail = {
      key: e,
    };
    this.router.navigateByUrl('/Learner/activitycenter', { state: { detail } });
  }

}
