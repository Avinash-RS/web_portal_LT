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
  @Input('from') from: any;
  @Input('showCartBtn') showCartBtn: boolean;
  @Input('showWishlist') showWishlist: boolean;
  @Input('canNavigate') canNavigate: boolean;
  @Input('showStatus') showStatus: boolean;
  breakpoint: number;
  pagenumber = 0;

  constructor(public service: CommonServicesService, private gs: GlobalServiceService, ) { }

  ngOnInit() { 
    if (this.gs.checkLogout()) {
      this.viewWishlist();
      this.gs.callWishlist.subscribe(message =>
        this.viewWishlist()
      );
    }
    // if (window.innerWidth <= 480)
    //   this.breakpoint = 1;
    // else if (window.innerWidth >= 480 && window.innerWidth <= 768)
    //   this.breakpoint = 2;
    // else if (window.innerWidth >= 768 && window.innerWidth <= 992) this.breakpoint = 3;
    // // else if (window.innerWidth >= 992 && window.innerWidth <= 1200)
    // //   this.breakpoint = 4;
    // else
    //   this.breakpoint = 4;
  }

  // onResize(event) {
  //   if (event.target.innerWidth <= 480)
  //     this.breakpoint = 1;
  //   else if (event.target.innerWidth >= 480 && event.target.innerWidth <= 768)
  //     this.breakpoint = 2;
  //   else if (event.target.innerWidth >= 768 && event.target.innerWidth <= 992)
  //     this.breakpoint = 3;
  //   // else if (event.target.innerWidth >= 992 && event.target.innerWidth <= 1200)
  //   //   this.breakpoint = 4;
  //   else
  //     this.breakpoint = 4;
  // }

  viewWishlist() {
    const userdetail = this.gs.checkLogout();
    this.service.viewWishlist(userdetail._id).subscribe((viewWishlist: any) => {
      if (viewWishlist.data.view_wishlist && viewWishlist.data.view_wishlist.success) {
        this.wishlist = viewWishlist.data.view_wishlist.message;
      }
    });
  }

  nextGetWishList() {
    this.pagenumber = this.pagenumber + 1;
    console.log(this.pagenumber);
    // this.service.viewWishlist(this.pagenumber).subscribe((result: any) => {
    //   this.viewWishlist.push(...result?.data?.viewWishlist?.message);
    //   };
    }
    // this.adminservice.getAllCatalogue(this.pagenumber).subscribe((result: any) => {
    //   this.catalogueList.push(...result?.data?.getallcatalogue?.message);
    // });
  // }

}
