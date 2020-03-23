import { Component, OnInit, Input } from '@angular/core';
import { CommonServicesService } from '../../services/common-services.service';
import { AlertServiceService } from 'src/app/common/services/handlers/alert-service.service';

@Component({
  selector: 'app-course-component',
  templateUrl: './course-component.component.html',
  styleUrls: ['./course-component.component.scss']
})
export class CourseComponentComponent implements OnInit {
  @Input('course') course: any;
  userDetail: any;

  constructor(public service: CommonServicesService, private alert: AlertServiceService) {
    this.userDetail = JSON.parse(localStorage.getItem('UserDetails')) || null;
    this.service.viewWishlist(this.userDetail._id).subscribe((viewWishlist: any) => {
      if (viewWishlist.data.logout && viewWishlist.data.logout.success) {

      }
    });
  }

  selectWishlist(id) {
    this.service.addWishlist(id,this.userDetail._id).subscribe((addWishlist: any) => {
      console.log(addWishlist.data.add_to_wishlist)
      if (addWishlist.data.add_to_wishlist && addWishlist.data.add_to_wishlist.success) {

      }
    });
  }

  
  ngOnInit() {
  }

}
