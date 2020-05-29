import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { WcaService } from '@wca/services/wca.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { ViewCoursesComponent } from '../view-courses/view-courses.component';

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
  modDetails = [];

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private apiService: WcaService,
    private alertService: AlertServiceService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.savedModules = [{
      coursename: 'cname',
      modulename: 'name',
      createdby: '',
      createdon: 'Date'
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
        // tslint:disable-next-line:no-shadowed-variable
        this.routeData.moduleList ? this.routeData.moduleList.forEach((data: any) => {
          if (val.moduleid === data) {
            val.isSelect = true;
            this.modDetails.push(data);
          }
          // tslint:disable-next-line:no-unused-expression
        }) : '';
      });
      this.savedModules = data.Result;
      this.dataSource = new MatTableDataSource<any>(this.savedModules);
      this.dataSource.paginator = this.paginator;
    });
  }

  onModuleSelection(module, e) {
    const modDetails = {
      moduleid: module.moduleid,
      coursename: module.coursename,
      createdby: module.createdby
    };
    let isValid = true;
    let n = 0;
    this.modDetails.forEach((val,i) => {
      if (val == module.moduleid) {
        isValid == false;
        n = i;
      }
    })
    if (e && isValid) {
      this.modDetails.push(module.moduleid);
       this.apiService.updatecoursetomudules(modDetails).subscribe((res: any) => {
          if (res.Code === 200) {

          }
        });
    }
    else if(!e && isValid) {
      this.modDetails.splice(n,1);
    }
  }

  onModuleSubmit() {

    this.alertService.openConfirmAlert('Please confirm to proceed', '').then((data: Boolean) => {
      if (data) {
        this.router.navigate(['/Admin/auth/Wca/addmodule'],
          {
            queryParams: {
              isRepo: true,
              courseId: this.routeData.viewingModule,
              courseImage: this.routeData.image,
              courseName: this.routeData.courseName,
              selectedModule: this.modDetails
            }
          });
       
      }
    });
  }

  viewModule(module) {
    const dg = this.dialog.open(ViewCoursesComponent, {
      data: {
        // tslint:disable-next-line:object-literal-shorthand
        module: module
      },
      width: '95%',
      panelClass: ['view-course-container']
    });

    dg.afterClosed().subscribe((data) => {
      this.getModules();
    });
  }
}
