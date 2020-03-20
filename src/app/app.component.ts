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
    var userDetailes = JSON.parse(localStorage.getItem('UserDetails')) || null;
    if (userDetailes != null && this.router.url == '/Learner/login' || this.router.url == '/Admin/login')
      this.router.navigate(["/Learner/courses"]);
    else if (userDetailes == null && this.router.url == '/Learner/MyCourse')
      this.router.navigate(["/Learner/login"])
    else
      this.router.navigate([this.router.url]);
    var name = localStorage.getItem('uname') ? localStorage.getItem('uname') : null;
    var psd = localStorage.getItem('ps') ? localStorage.getItem('ps') : null;
    var cookie = localStorage.getItem('remember_me') ? localStorage.getItem('remember_me') : 'false';
    var ps = atob(psd)
    if (cookie == 'true') {
      if ((name || psd) == null) {
        this.router.navigate(["/Learner/login"]);
      } else {
        this.router.navigate(["/Learner"]);
      }
    }
  }

}
