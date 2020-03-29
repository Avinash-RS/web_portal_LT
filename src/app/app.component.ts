import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalServiceService } from '././core/services/handlers/global-service.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ipAddress = '';
  title = 'Lxpfrontend';
  constructor(private router: Router,
    private gs: GlobalServiceService,
    private http: HttpClient,
  ) {
    this.getIPAddress();
  }

  ngOnInit() {

    this.getIPAddress();
    var name = localStorage.getItem('uname') ? localStorage.getItem('uname') : null;
    var psd = localStorage.getItem('ps') ? localStorage.getItem('ps') : null;
    var login = localStorage.getItem('login') ? localStorage.getItem('login') : null;
    console.log(login, typeof login, login == 'true')
    var cookie = localStorage.getItem('remember_me') ? localStorage.getItem('remember_me') : 'false';
    var ps = atob(psd)
    if (login == 'true') {
      if (cookie == 'true') {
        if ((name || psd) == null) {
          this.router.navigate(["/Learner/login"]);
        }
      } else {
        // Commented by rajesh because whenever i will reload the page it clearing my localstorage
        // Yeah Rajesh, u need to enable remember me for this - Mythreyi
        //  If i am first time register i don't have remember me its giving lot of problem  :: ankit
        //  I think now the issue will get resolved - Mythreyi
        localStorage.clear();
      }
    }

  }

  getIPAddress() {
    this.http.get("http://api.ipify.org/?format=json").subscribe((res: any) => {
      this.ipAddress = res.ip;
      localStorage.setItem('Systemip', this.ipAddress)
    });
  }

}
