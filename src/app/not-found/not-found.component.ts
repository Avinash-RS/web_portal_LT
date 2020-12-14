import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(

    private router: Router,
  ) { }

  ngOnInit() {
  }

  goToHome() {
    this.router.navigate(['/Learner/login']);
  }

}
