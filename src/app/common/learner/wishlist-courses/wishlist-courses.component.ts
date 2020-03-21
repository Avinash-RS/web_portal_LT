import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from '../../services/common-services.service';

@Component({
  selector: 'app-wishlist-courses',
  templateUrl: './wishlist-courses.component.html',
  styleUrls: ['./wishlist-courses.component.scss']
})
export class WishlistCoursesComponent implements OnInit {
  userDetail: any;
  wishlist: any = [];

  constructor(public service: CommonServicesService) { }

  ngOnInit() {
    this.userDetail = JSON.parse(localStorage.getItem('UserDetails')) || null;
    this.service.viewWishlist(this.userDetail._id).subscribe((viewWishlist: any) => {
      if (viewWishlist.data.view_wishlist && viewWishlist.data.view_wishlist.success) {
        this.wishlist = viewWishlist.data.view_wishlist.message;
        console.log(this.wishlist)
      }
    });
  }

}
