import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wca',
  templateUrl: './wca.component.html',
  styleUrls: ['./wca.component.scss']
})
export class WcaComponent implements OnInit {
  userimage: any;
  userDetailes: any;
  navigateProfile: any;
  navigateWishlist: any;
  logout: any;
  constructor() { }

  ngOnInit() {
  }

}
