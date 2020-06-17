import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as _ from 'lodash';
import * as myGlobals from '@core/globals';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

// export interface User {
//   name: string;
// }

@Component({
  selector: 'app-bulk-enrollment',
  templateUrl: './bulk-enrollment.component.html',
  styleUrls: ['./bulk-enrollment.component.scss']
})

export class BulkEnrollmentComponent implements OnInit {
  groups: any;
  singleUserForm: FormGroup;
  options = [{ name: 'One' }, { name: 't' }, { name: 'sdfg' }, { name: 'dfsd' }, { name: 'ht' }, { name: 'zsdfg' }];
  filteredOptions: Observable<any[]>;
  selectedArray: any = [];
  lastFilter: string = '';
  selectedgroup = [];
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA]; // for mat chips to add into an array
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('usergroup') usergroup: ElementRef<HTMLInputElement>;  //mat input values

  constructor(private formBuilder: FormBuilder, private adminservice: AdminServicesService) {
    this.singleUserForm = this.formBuilder.group({
      group: new FormControl('', myGlobals.req),
      userType: ['', myGlobals.req]
    });
  }

  ngOnInit() {

    this.adminservice.getUserGroup()
    .subscribe((result: any) => {
      const tree = this.tree(result?.data?.get_user_group?.message, null);
      this.groups = this.flattree(tree);
      this.filteredOptions = this.groups;
      // this.filteredOptions = this.singleUserForm.get('group').valueChanges.pipe(
      //   startWith(''),
      //   map(value => typeof value === 'string' ? value : value.group_name),
      //   map(name => name ? this._filter(name) : this.groups.slice())
      // );

      // this.filteredOptions = this.singleUserForm.get('group').valueChanges.pipe(
      //   startWith(''),
      //   map(value => this._filter(value))
      // );
      this.filteredOptions = this.singleUserForm.get('group').valueChanges.pipe(
        startWith<string | any[]>(''),
        map(value => typeof value === 'string' ? value : this.lastFilter),
        map(filter => this._filter(filter))
      );
    });

  }

  tree(data, root) {
    function setCount(object) {
        return object.children
            ? (object.count = object.children.reduce((s, o) => s + 1 + setCount(o), 0))
            : 0;
    }
    const t = {};
    data.forEach(o => {
        Object.assign(t[o.group_id] = t[o.group_id] || {}, o);
        t[o.parent_group_id] = t[o.parent_group_id] || {};
        t[o.parent_group_id].children = t[o.parent_group_id].children || [];
        t[o.parent_group_id].children.push(t[o.group_id]);
        if (o.parent_group_id === root) { t[o.group_id].root = true; }
    });
    setCount(t[root]);
    return t[root].children;
}
flattree(items) {
  const flat = [];
  items.forEach(item => {
    flat.push(item);
    if (Array.isArray(item.children) && item.children.length > 0) {
      flat.push(...this.flattree(item.children));
      delete item.children;
    }
    delete item.children;
  });
  return flat;
}


  // displayFn(user: any): string {
  //   return user && user.group_name ? user.group_name : '';
  // }


  displayFn(value: any[] | string): string | undefined {
    let displayValue: string;
    if (Array.isArray(value)) {
      value.forEach((user, index) => {
        if (index === 0) {
          displayValue = user.group_name;
        } else {
          displayValue += ', ' + user.group_name;
        }
      });
    } else {
      displayValue = value;
    }
    return displayValue;
  }

  private _filter(name: string): string[] {
    // const filterValue = name.toLowerCase();
    // return this.groups.filter(option => option.group_name.toLowerCase().indexOf(filterValue) === 0);
    this.lastFilter = name;
    if (name) {
      return this.groups.filter(option => {
        return option.group_name.toLowerCase().indexOf(name.toLowerCase()) >= 0
          || option.group_name.toLowerCase().indexOf(name.toLowerCase()) >= 0;
      });
    } else {
      return this.groups.slice();
    }

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
    // this.userControl.setValue(this.selectedUsers);
    this.singleUserForm.get('group').setValue(this.selectedArray);
    console.log(this.singleUserForm);

  }

  // toggleSelection(user: any) {
  //   user.selected = !user.selected;
  //   if (user.selected) {
  //     this.selectedUsers.push(user);
  //   } else {
  //     const i = this.selectedUsers.findIndex(value => value.firstname === user.firstname && value.lastname === user.lastname);
  //     this.selectedUsers.splice(i, 1);
  //   }

  //   this.userControl.setValue(this.selectedUsers);
  // }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event.option.viewValue);
    this.selectedgroup.push({group_name: event.option.viewValue});
    this.usergroup.nativeElement.value = '';
    this.singleUserForm.get('group').setValue(null);
  }

   remove(indx): void {
    this.selectedgroup.splice(indx, 1);
  }
}
