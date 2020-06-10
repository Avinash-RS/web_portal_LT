import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { CommonServicesService } from '@core/services/common-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { Router } from '@angular/router';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
	selector: 'cdk-user-menu',
	templateUrl: './user-menu.component.html',
	styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
	isOpen = false;

	// currentUser = null;
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
		private router: Router, private gs: GlobalServiceService, private http: HttpClient, ) {
		// getAdminName
		this.userDetailes =
			JSON.parse(localStorage.getItem('adminDetails')) || null;
		// this.currentUser = this.userDetailes.username;
		// console.log(this.currentUser)


		this.gs.adminName.subscribe((message) => {
			const msg = message.replace('"', '');
			const msg1 = msg.replace('"', '');
			this.userName = msg1;
		}
		);
	}

logout() {
 Swal.fire({
 title: 'Are you sure you want to log out ?',
 showCancelButton: true,
 confirmButtonColor: '#3085d6',
 cancelButtonColor: '#d33',
 confirmButtonText: 'Yes'
 }).then((result) => {
 if (result.value) {
this.services.logout(this.userDetailes._id, false).subscribe((logout: any) => {
 if (logout.data.logout && logout.data.logout.success) {
localStorage.clear();
this.http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
localStorage.setItem('Systemip', res.ip);
});
this.userDetailes = null;
this.router.navigate(['/Admin/login']);
} else if (logout.data.logout && !logout.data.logout.success) {
if (logout.data.logout.error_msg === 'Authentication error. Token required.') {
localStorage.clear();
this.http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
localStorage.setItem('Systemip', res.ip);
});
this.userDetailes = null;
this.userDetailes = null;
this.router.navigate(['/Admin/login']);
} else {
this.alert.openAlert(logout.data.logout.message, null);
}
} else {
this.alert.openAlert('Please try again later', null);
}
});
}
});
}
	ngOnInit() {
	}

}
