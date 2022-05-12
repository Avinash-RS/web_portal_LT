import { Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { Gtag } from 'angular-gtag';

@Injectable({

providedIn: 'root'

})

export class GoogleAnalyticsService {

constructor(private gtag: Gtag,
            private router: Router) { }

setInnerPage(title: string) {
this.gtag.pageview({
    page_title: title,
    page_path: this.router.url,
    page_location: window.location.href
  });
}
}
