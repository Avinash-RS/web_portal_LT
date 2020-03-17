import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
// import { CookieModule, CookieService } from 'ngx-cookie';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ipAddress = '';
  constructor(private router: Router,
    // private cookieService: CookieService,
    private http: HttpClient
  ) {
    this.getIPAddress();
  }

  ngOnInit() {
    this.getIPAddress();
  }

  getIPAddress() {
    this.http.get("http://api.ipify.org/?format=json").subscribe((res: any) => {
      this.ipAddress = res.ip;
      localStorage.setItem('Systemip', this.ipAddress)
    });
  }

  changeOfRoutes() {
    // var name = this.cookieService.get('uname') ? this.cookieService.get('uname') : null;
    // var ps = this.cookieService.get('ps') ? this.cookieService.get('ps') : null;
    // var psd = ps && atob(ps);
    // var cookie = this.cookieService.get('remember_me') ? this.cookieService.get('remember_me') : 'false';
    // console.log(name, ps, psd, (name || psd) == null)
    // if (cookie == 'true') {
    //   if ((name || psd) == null) {
    //     this.router.navigate(["/login"]);
    //   } else {
    //     this.router.navigate(["/courses"]);
    //   }
    // }
  }

}
