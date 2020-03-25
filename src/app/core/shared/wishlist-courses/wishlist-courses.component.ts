import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonServicesService } from '@core/services/common-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';

@Component({
  selector: 'app-wishlist-courses',
  templateUrl: './wishlist-courses.component.html',
  styleUrls: ['./wishlist-courses.component.scss']
})
export class WishlistCoursesComponent implements OnInit {
  wishlist: any = [];
  constructor(public service: CommonServicesService, private gs: GlobalServiceService, ) { }

  ngOnInit() {
    if (this.gs.checkLogout()) {
      this.viewWishlist();
      this.gs.callWishlist.subscribe(message =>
        this.viewWishlist()
      )
    }
  }

  viewWishlist() {
    var userdetail = this.gs.checkLogout()
    this.service.viewWishlist(userdetail._id).subscribe((viewWishlist: any) => {
      if (viewWishlist.data.view_wishlist && viewWishlist.data.view_wishlist.success) {
        this.wishlist = viewWishlist.data.view_wishlist.message;
      }
    });
  }
}
