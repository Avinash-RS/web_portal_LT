import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { WcaService } from '@wca/services/wca.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';

@Component({
  selector: 'app-module-repository',
  templateUrl: './module-repository.component.html',
  styleUrls: ['./module-repository.component.scss']
})
export class ModuleRepositoryComponent implements OnInit {
  routeData: any;
  savedModules: any[] = [];
  displayedColumns: string[] = ['modulename', 'coursename', 'createdby', 'createdon', 'view', 'select'];
  dataSource = new MatTableDataSource<any>(this.savedModules);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private apiService: WcaService,
    private alertService: AlertServiceService
  ) { }

  ngOnInit() {
    this.savedModules = [{
      coursename: "cname",
      modulename: "name",
      createdby: "",
      createdon: "Date"
    }];
    this.dataSource.paginator = this.paginator;
    this.route.queryParams.subscribe(params => {
      let flag = 0;
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          flag = 1;
        }
      }
      if (flag) {
        this.routeData = params;
        this.getModules();
      }
    });

  }

  getModules() {
    this.apiService.repositoryModules().subscribe((data: any) => {
      data.Result.forEach((val) => {
        val.createdon = val.createdon ? new Date(val.createdon) : '';
        val.isSelect = false;
        this.routeData.moduleList.forEach((data) => {
          if(val.moduleid == data) {
            val.isSelect = true;
          }
        })
      })
      this.savedModules = data.Result;
      this.dataSource = new MatTableDataSource<any>(this.savedModules);

    })
  }

  onModuleSelection(selectedModule) {

    this.alertService.openConfirmAlert('Please confirm to proceed', '').then((data: Boolean) => {
      if (data) {
      }
    })
  }
}