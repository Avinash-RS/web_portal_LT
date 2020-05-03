import { Component, OnInit } from '@angular/core';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { RouterLink } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { WcaService } from '../../services/wca.service';


@Component({
  selector: 'app-view-module',
  templateUrl: './view-module.component.html',
  styleUrls: ['./view-module.component.scss']
})
export class ViewModuleComponent implements OnInit {
  queryData:any;
  courseDetails:any;
  constructor(
    private router: Router,
    public route:ActivatedRoute,
    private wcaService: WcaService,

    ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let flag = 0;
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          flag = 1;
        }
      }
      if (flag) {
      this.queryData = params;
      console.log(this.queryData)
      }
    });
  }

  
  navChooseTemp() {
    
    this.router.navigate(['/Admin/auth/Wca/choosetemplate'],{queryParams: { viewingModule: this.queryData.viewingModule ,courseName:this.queryData.courseName,image: this.queryData.image}});
  
  }

  navViewModule() {
    this.router.navigate(['/Admin/auth/Wca/viewmodule'],{queryParams: { viewingModule: this.queryData.viewingModule ,image: this.queryData.image,courseName:this.queryData.courseName}});
  }


}
