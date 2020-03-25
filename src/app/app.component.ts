import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalServiceService } from '././core/services/handlers/global-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ipAddress = '';
  constructor(private router: Router,
    private gs: GlobalServiceService,
    private http: HttpClient
  ) {
    this.getIPAddress();
  }

  ngOnInit() {
    this.getIPAddress();
    console.log('inside')
    // if(this.gs.checkLogout()) {
     
      var name = localStorage.getItem('uname') ? localStorage.getItem('uname') : null;
      var psd = localStorage.getItem('ps') ? localStorage.getItem('ps') : null;
      var cookie = localStorage.getItem('remember_me') ? localStorage.getItem('remember_me') : 'false';
      var ps = atob(psd)
      console.log('inside',cookie)
      if (cookie == 'true') {
        if ((name || psd) == null) {
          this.router.navigate(["/Learner/login"]);
        } 
      } else {
        localStorage.clear();
        // console.log(this.router.url)
        // this.router.navigate(["/Learner/login"]);
      }
    // }
  }

  getIPAddress() {
    this.http.get("http://api.ipify.org/?format=json").subscribe((res: any) => {
      this.ipAddress = res.ip;
      localStorage.setItem('Systemip', this.ipAddress)
    });
  }

}
