import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { CommonServicesService } from '@core/services/common-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { Router } from '@angular/router';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';

@Component({
	selector: 'cdk-user-menu',
	templateUrl: './user-menu.component.html',
	styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
	isOpen: boolean = false;

	//currentUser = null;
	Afser;


	@Input() currentUser = null;
	// currentUser = null;
	userDetailes: any;
	userName: string;
	@HostListener('document:click', ['$event', '$event.target'])
	onClick(event: MouseEvent, targetElement: HTMLElement) {
		if (!targetElement) {
			return;
		}

		const clickedInside = this.elementRef.nativeElement.contains(targetElement);
		if (!clickedInside) {
			this.isOpen = false;
		}
	}


	constructor(private elementRef: ElementRef, public services: CommonServicesService, private alert: AlertServiceService,
		private router: Router, private gs: GlobalServiceService, ) {
		// getAdminName
		this.userDetailes =
			JSON.parse(localStorage.getItem('adminDetails')) || null;
		// this.currentUser = this.userDetailes.username;
		// console.log(this.currentUser)


		this.gs.adminName.subscribe(message =>
				this.userName= message
		)
	}

	logout() {
		this.services.logout(this.userDetailes._id, false).subscribe((logout: any) => {
			if (logout.data.logout && logout.data.logout.success) {
				localStorage.clear();
				this.userDetailes = null;
				this.router.navigate(['/Admin/login'])
			}
			else if (logout.data.logout && !logout.data.logout.success) {
				if (logout.data.logout.error_msg == "Authentication error. Token required.") {
					localStorage.clear();
					this.userDetailes = null;
					this.router.navigate(['/Admin/login'])
				}
				else
					this.alert.openAlert(logout.data.logout.message, null);
			}
			else
				this.alert.openAlert('Please try again later', null)
		});
	}
	ngOnInit() {
	}

}
