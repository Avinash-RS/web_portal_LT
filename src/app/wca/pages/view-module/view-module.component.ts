import { Component, OnInit } from '@angular/core';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router'


@Component({
  selector: 'app-view-module',
  templateUrl: './view-module.component.html',
  styleUrls: ['./view-module.component.scss']
})
export class ViewModuleComponent implements OnInit {
  

  constructor(private router: Router) { }

  ngOnInit() {
  }

  
  add() {
    
    this.router.navigate(["choosetemplate"])
  
  }


}
