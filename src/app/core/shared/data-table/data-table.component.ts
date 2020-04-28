import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input() tableData;
  @Input() columnHeader;
  dataSource;
  selectedArray = [];
  @ViewChild(MatSort) sort: MatSort;
  
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
  }

  checkboxLabel(row?) {
    if (row.isChecked == undefined) {
      row.isChecked = true;
      this.selectedArray.push(row);
      console.log(this.selectedArray)
    }
    else {
      row.isChecked = !row.isChecked;
      this.selectedArray  = this.selectedArray.filter(i => i !== row);
      console.log(this.selectedArray)
    }
  }
}
