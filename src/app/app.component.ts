import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalServiceService } from '././core/services/handlers/global-service.service';
import { WcaService } from '../app/wca/services/wca.service';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { CommonServicesService } from '@core/services/common-services.service';
import { Subscription } from 'rxjs';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { environment } from '@env/environment.collageConnect';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ipAddress = '';
  title = 'Lxpfrontend';
  isLoader = false;
  loaderSubscription: Subscription;
  constructor(private router: Router,
    private gs: GlobalServiceService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private APIService: WcaService,
    private titleService: Title,
    private commonService: CommonServicesService,
    public Lservice: LearnerServicesService,

  ) {
    this.getIPAddress();
    this.getorganizationbyiddetails();
  }

  ngOnInit() {
    this.loaderSubscription = this.commonService.loader.subscribe((val) => {
      this.isLoader = val;
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {
      const rt = this.getChild(this.activatedRoute);
      rt.data.subscribe(data => {
        this.titleService.setTitle(data.title);
      });
    });

    this.getIPAddress();
    // var name = localStorage.getItem('uname') ? localStorage.getItem('uname') : null;
    // var psd = localStorage.getItem('ps') ? localStorage.getItem('ps') : null;
    // var login = localStorage.getItem('login') ? localStorage.getItem('login') : null;
    // var cookie = localStorage.getItem('remember_me') ? localStorage.getItem('remember_me') : 'false';
    // var ps = atob(psd)
    // if (login == 'true') {
    //   if (cookie == 'true') {
    //     if ((name || psd) == null) {
    //       this.router.navigate(["/Learner/login"]);
    //     }
    //   } else {
    //     // Commented by rajesh because whenever i will reload the page it clearing my localstorage
    //     // Yeah Rajesh, u need to enable remember me for this - Mythreyi
    //     //  If i am first time register i don't have remember me its giving lot of problem  :: ankit
    //     //  I think now the issue will get resolved - Mythreyi
    //     localStorage.clear();
    //   }
    // }
  }

  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }

  }

  getIPAddress() {
    this.http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
      this.ipAddress = res.ip;
      localStorage.setItem('Systemip', this.ipAddress);
    });
  }

  ngOnDestroy(): void {
    this.loaderSubscription.unsubscribe();
  }

  getorganizationbyiddetails() {
    const organizationid = environment.orgId;
    if (organizationid === '') {
      // localStorage.clear();
      localStorage.removeItem('organizationDetails');
    }

    this.Lservice
      .get_organization_by_id(organizationid)
      .subscribe((result: any) => {
        console.log(result, 'resultdata');
        if (result.data?.get_organization_by_id?.success) {
          localStorage.setItem('organizationDetails', JSON.stringify(result.data?.get_organization_by_id?.message));
        }
      });
  }
}
