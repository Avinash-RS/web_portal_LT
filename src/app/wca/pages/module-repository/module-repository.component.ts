import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatDialog, MatSort } from '@angular/material';
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
  courseDetails: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
    this.dataSource.sort = this.sort;
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getModules(d?) {
    this.apiService.repositoryModules().subscribe((data: any) => {
      data.Result.forEach((val) => {
        val.createdon = val.createdon ? new Date(val.createdon) : '';
        val.isSelect = false;
        if (d === 'update') {
          if (this.modDetails.length > 0) {
            this.modDetails.forEach((mdata, i) => {
              if (mdata === val.moduleid) {
                if (val.modulestatus === 'true') {
                  val.isSelect = true;
                } else {
                  this.modDetails.splice(i, 1);
                }
              }
            });

          }
        } else {
          // tslint:disable-next-line:no-shadowed-variable
          this.modDetails = this.routeData.moduleList;
          // tslint:disable-next-line: no-shadowed-variable
          this.routeData.moduleList ? this.routeData.moduleList.forEach((data: any) => {
            if (val.moduleid === data) {
              val.isSelect = true;
            }
            // tslint:disable-next-line:no-unused-expression
          }) : '';
        }
      });
      this.apiService.getCourseDetails(this.routeData.viewingModule).subscribe((dataT: any) => {
        dataT.Result[0].coursedetails.forEach(valT => {
          data.Result.forEach((repoVal,i) => {
            if(repoVal.moduleid == valT.moduleid) {
              data.Result.splice(i,1);
            }
          })
        });
        this.savedModules = data.Result;

        this.dataSource = new MatTableDataSource<any>(this.savedModules);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
 
    });
  }

  onModuleSelection(module, e) {
    if (module.modulestatus === 'false') {
      return false;
    }
    const modDetails = {
      moduleid: module.moduleid,
      coursename: module.coursename,
      createdby: module.createdby
    };
    let isValid = true;
    let n = 0;

    this.modDetails.filter((id, idx) => {
      if (id === module.moduleid) {
        isValid = false;
        n = idx;
      }
    });


    if (e && isValid) {
      this.modDetails.push(module.moduleid);
      this.apiService.updatecoursetomudules(modDetails).subscribe((res: any) => {
        if (res.Code === 200) {

        }
      });
      this.savedModules.forEach((val) => {
        if (val.moduleid === module.moduleid) {
          val.isSelect = true;
        }
      });
    } else if (!e && !isValid) {
      this.savedModules.forEach((val) => {
        if (val.moduleid === module.moduleid) {
          val.isSelect = false;
        }
      });
      this.modDetails.splice(n, 1);
    }
  }

  onModuleSubmit() {

    // tslint:disable-next-line: ban-types
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
      this.getModules('update');
    });
  }
}
