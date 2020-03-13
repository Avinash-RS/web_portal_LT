import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router, 
    private cookieService: CookieService
    ) {
    // this.router.events.subscribe((e) => {
    // if (e instanceof NavigationStart) {
    //   console.log('hiiiiiiiiiiii');
    //   var name = this.cookieService.get('uname') ? this.cookieService.get('uname') : null;
    //   var ps = this.cookieService.get('ps') ? this.cookieService.get('ps') : null;
    //   var psd = ps && atob(ps);
    //   console.log(name,ps,psd)
    //   if ((name && psd) == null) {
    //     this.router.navigate(["/login"]);
    //   }
    // }
    // });
  }

  changeOfRoutes() {
    var name = this.cookieService.get('uname') ? this.cookieService.get('uname') : null;
    var ps = this.cookieService.get('ps') ? this.cookieService.get('ps') : null;
    var psd = ps && atob(ps);
    console.log(name, ps, psd,(name || psd) == null )
    if ((name || psd) == null) {
      this.router.navigate(["/login"]);
    } else {
      this.router.navigate(["/courses"]);
    }
  }

}
