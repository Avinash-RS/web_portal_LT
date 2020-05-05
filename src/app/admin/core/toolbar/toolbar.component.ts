import { Component, OnInit, Input } from '@angular/core';
import { ToolbarHelpers } from './toolbar.helpers';
import { AdminServicesService } from '@admin/services/admin-services.service';


@Component({
	selector: 'lxp-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

	@Input() sidenav;
	@Input() sidebar;
	@Input() drawer;
	@Input() matDrawerShow;

	searchOpen: boolean = false;
	toolbarHelpers = ToolbarHelpers;

	constructor(private adminService: AdminServicesService) { }

	ngOnInit() {
		var admin_details = JSON.parse(localStorage.getItem('adminDetails'))
		this.feedNotificationData(admin_details._id);
	}
	feedNotificationData(admin_id) {
		this.adminService.getNotificationData(admin_id).subscribe((result: any) => {
			this.toolbarHelpers.notifications = result.data['getnotificationreports'].message
		})
	}
}
