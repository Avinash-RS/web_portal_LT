import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-module-repository',
  templateUrl: './module-repository.component.html',
  styleUrls: ['./module-repository.component.scss']
})
export class ModuleRepositoryComponent implements OnInit {
  routeData: any; 
  displayedColumns: string[] = ['modueName', 'courseName', 'createrName', 'createdOn','view','select'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
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
      }
    });
  }
}
  
const ELEMENT_DATA: any[] = [
  {modueName: "module01", courseName: 'course01', createrName: 'asok', createdOn: '28 Apr,2020'},
  {modueName: "module02", courseName: 'course2', createrName: 'vijay', createdOn: '29 Apr,2020'},
  {modueName: "module03", courseName: 'course2', createrName: 'pagal', createdOn: '1 Apr,2020'},
  {modueName: "module04", courseName: 'course2', createrName: 'naren', createdOn: '2 Apr,2020'},
  {modueName: "module05", courseName: 'course2', createrName: "rajesh", createdOn: '22 Apr,2020'}
];