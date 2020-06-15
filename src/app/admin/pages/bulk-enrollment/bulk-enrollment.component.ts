import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as _ from 'lodash';
import * as myGlobals from '@core/globals';

export interface User {
  name: string;
}

@Component({
  selector: 'app-bulk-enrollment',
  templateUrl: './bulk-enrollment.component.html',
  styleUrls: ['./bulk-enrollment.component.scss']
})

export class BulkEnrollmentComponent implements OnInit {

  singleUserForm: FormGroup;
  options = [{ name: 'One' }, { name: 't' }, { name: 'sdfg' }, { name: 'dfsd' }, { name: 'ht' }, { name: 'zsdfg' }];
  filteredOptions: Observable<any[]>;
  selectedArray: any = [];

  constructor(private formBuilder: FormBuilder) {
    this.singleUserForm = this.formBuilder.group({
      group: new FormControl('', myGlobals.req),
      userType: ['', myGlobals.req]
    });
    this.filteredOptions = this.singleUserForm.get('group').valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.options.slice())
    );
  }

  ngOnInit() {

  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  checkboxLabel(row?) {
    if (row.isChecked === undefined || row.isChecked === false) {
      row.isChecked = true;
      this.selectedArray.push(row);
    } else {
      row.isChecked = !row.isChecked;
      this.selectedArray = this.selectedArray.filter(i => i !== row);
    }
    console.log(this.selectedArray);
  }
}
