import { Component, OnInit ,ViewChild} from '@angular/core';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { BehaviorSubject } from 'rxjs';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { batchService } from '../batch-management.service';

export interface LeanerList {
  full_name: string;
  user_id: string;
  name: number;
  email: string;
  mobile: string;
  isChecked : boolean
}
@Component({
  selector: 'batch-add-learner',
  templateUrl: './batch-add-learner.component.html',
  styleUrls: ['./batch-add-learner.component.scss','../../admin/pages/group-management/group-management.component.scss']
})
export class BatchAddLearnerComponent implements OnInit {
  pagenumber = 0;
  groups: any;
  group_name: any;
  resultsLength: number = null;
  toggle: any;
  ELEMENT_DATA: LeanerList[] = [];
  selectedArray: any = [];
  displayedColumns: string[] = ['full_name','user_id', 'name', 'email', 'mobile', 'active','select'];
  SelectLeaners = false;
  dataSource = new MatTableDataSource<LeanerList>(this.ELEMENT_DATA);
  selection = new SelectionModel(true, []);
  branchDetails = {
    batchname: '',
    batchdescription: '',
    batchstartdate: '',
    batchenddate: '',
    user_details: [],
    course_details: [],
    instructure_details: []
  };
  currentpath = null;
  readonly dataSource$: BehaviorSubject<any[]>;
  readonly treeSource: MatTreeNestedDataSource<any>;
  /** tree control */
  readonly treeControl = new NestedTreeControl<any>(node => node.children);
  readonly hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private adminservice: AdminServicesService,private alert: AlertServiceService,public toast: ToastrService,
    private router: Router,
    public route: ActivatedRoute,
    public apiService: batchService) {
    this.treeSource = new MatTreeNestedDataSource<any>();
    this.dataSource$ = new BehaviorSubject<any[]>([]);
   }

  ngOnInit() {
    this.getgroups();
    if(this.apiService.batchDetails.user_details.length > 0) {
      let learnerList = [];
      this.apiService.batchDetails.user_details.forEach((data) => {
        learnerList.push({
          user_id: data.id,
          full_name: data.name
        })
      })
      
      this.selectedArray = learnerList
    }
  }
  getgroups() {
    this.pagenumber = 0;
    const data = { input_id: 'h1', type: 'hierarchy', pagenumber: 0 };
    this.adminservice.getgroup(data)
      .subscribe((result: any) => {
        this.groups = result.data.getgroup.message;
        this.adminservice.getgroup(data).subscribe((result1: any) => {
          this.groups = result1.data.getgroup.message;
          this.treeSource.data = null;
          this.treeSource.data = this.groups;
          this.dataSource$.next(this.groups);
        });
      });
  }
  loadsubgroup(node?: any) {
    const data = { input_id: node.group_id, type: 'group', pagenumber: 0 };
    this.adminservice.getgroup(data).subscribe((result: any) => {
      const group = result.data.getgroup.message;
      if (node) {        
        node.children = group;
        this.treeControl.expand(node);
      } else {
        this.dataSource$.next([
          ...this.dataSource$.value, group[0]]);
      }
      const array = this.treeSource.data;
      this.treeSource.data = null;
      this.treeSource.data = array;
    });
  }
  updatecheckbox(items, id, name) {
    let item;    
    for (let i = 0; i < items.length; i++) {
      item = items[i];
      if (item.group_id === id) {
        item.checkbox = name;
        return;
      }
      if (item.children) {
        this.updatecheckbox(item.children, id, name);
      }
    }
  }
  selectgroup(node) {
    if(node.checkbox === false){
      this.currentpath = null;  
      this.getAllUser(this.pagenumber);
    }
    if (this.currentpath) {      
      this.updatecheckbox(this.treeSource.data, this.currentpath?.group_id, false);
    }
    if (node.checkbox === true) {
      this.currentpath = null;
      this.currentpath = node;
      this.group_name = node.group_name;
      this.toggle = !node.is_active;
      this.getAllUser(0);
    } else {      
      this.currentpath = null;      
    }
  }
  getAllUser(pagenumber) {    
    this.resultsLength = null;
    if (pagenumber === 0) {
      this.ELEMENT_DATA = [];
    }
    this.adminservice.getAllUsers(pagenumber, 1, this.currentpath.group_id)
      .subscribe((result: any) => {
        if (result.data && result.data.get_all_user) {
          console.log(result.data.get_all_user.message)
          if (pagenumber === 0) {
            this.ELEMENT_DATA = [];
            this.dataSource = new MatTableDataSource<LeanerList>(this.ELEMENT_DATA);
          }
          // console.log(result.data.get_all_user);
          Array.prototype.push.apply(this.ELEMENT_DATA, result.data.get_all_user.message);
          this.dataSource = new MatTableDataSource<LeanerList>(this.ELEMENT_DATA);
          this.resultsLength = result.data.get_all_user.learner_count;
          this.selection = new SelectionModel(true, []);
          setTimeout(()=>{
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },1000)
        } else {
          this.alert.openAlert('Please try again later', null);
        }
      });
  }
  next(e) {
    this.getAllUser(e.pageIndex);
    this.SelectLeaners = false;
  }
  checkboxLabel(row,value:any) {
    console.log(row)
    if(value == 'remove'){
      row.isChecked = false;
    }
    if (row.isChecked === undefined || row.isChecked === false) {
      this.selectedArray = this.selectedArray.filter(i => i !== row);
    } else {
      var selectedUser = []
      this.selectedArray.forEach(element => {
        if(element.user_id === row.user_id){
          selectedUser.push("duplicate")
        }
      });
      if(selectedUser.length == 0){
        this.selectedArray.push(row);
      }
      else{
        this.toast.warning('Leaner already added');
      }
      
    }
  }
  onScrollDown() {
    this.pagenumber = this.pagenumber + 1;
    const data = { input_id: 'h1', type: 'hierarchy', pagenumber: this.pagenumber };
    this.adminservice.getgroup(data).subscribe((result: any) => {
      const resultdata = result.data.getgroup.message;
      if (resultdata.length) {
        let array: any;
        array = resultdata;
        this.groups = this.treeSource.data;
        this.groups.push(...array);
        this.treeSource.data = null;
        this.treeSource.data = this.groups;
      }
    });
  }
  SelectAllLeaner(){
    this.dataSource.data.forEach((element)=>{
      if(this.SelectLeaners){
        element.isChecked = true
        var selectedUser = []
      this.selectedArray.forEach(element1 => {
        if(element1.user_id === element.user_id){
          selectedUser.push("duplicate")
        }
      });
      if(selectedUser.length == 0){
        this.selectedArray.push(element);
      }
      }
      else{
        element.isChecked = false
        this.selectedArray = this.selectedArray.filter(i => i !== element);
      }
    })

  }
  addLeaner(){     
    // var value = this.selectedArray   
// this.router.navigateByUrl('/', {skipLocationChange: true})
    // .then(() => this.router.navigateByUrl('/Admin/auth/viewReport', { state: { type: value } }));
    // to send data
    let learner = [];
    this.selectedArray.forEach((val) => {
      learner.push({
        id: val.user_id,
        name: val.full_name,
        image: ''
      })
    })
    this.apiService.batchDetails.user_details = learner;
     this.router.navigate(['/Admin/auth/batch/create'], {
      queryParams:
      {
        isEdit: 'true'
      }
    });
    // to retrive data
    // this.report_data = this.route.getCurrentNavigation().extras.state.type;
  }
}
