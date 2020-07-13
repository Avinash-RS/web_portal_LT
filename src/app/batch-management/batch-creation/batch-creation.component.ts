import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WcaService } from '@wca/services/wca.service';
import { ToastrService } from 'ngx-toastr';
import { batchService } from '../batch-management.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'batch-creation',
  templateUrl: './batch-creation.component.html',
  styleUrls: ['./batch-creation.component.scss']
})
export class BatchCreationComponent implements OnInit {

  step = 4;
  instructors = [];
  branchDetails = {
    batchname: '',
    batchdescription: '',
    batchstartdate: '',
    batchenddate: '',
    user_details: [],
    course_details: [],
    instructure_details: []
  };
  selectedInst = [];
  isEdit: boolean;
  constructor(
    private wcaService: WcaService,
    public toast: ToastrService,
    private apiService: batchService,
    private router: Router,
    public route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.getInsructors();
    this.route.queryParams.subscribe(params => {
      if (params.isEdit == 'true' && this.apiService.batchDetails) {
        this.isEdit = true;
        this.branchDetails = this.apiService.batchDetails;
      }
    });
  }


  setStep(index: number) {
    this.step = index;
  }

  getInsructors() {
    this.wcaService.getAllInstructors().subscribe((data: any) => {
      let inst = [];
      data.Result.forEach((val) => {
        inst.push({
          id: val._id,
          name: val.name,
          image: val.image,
          description: val.description
        })
      })
      this.instructors = inst;
    });
  }

  instrucSelection(e) {
    this.selectedInst = e.value;
    this.addInst();
  }

  addInst() {
    let instDetails = [];
    this.selectedInst.forEach((val) => {
      this.instructors.forEach((dt) => {
        let inst = {
          id: "",
          name: "",
          image: "",
          description: ""
        };
        if (dt.id == val) {
          inst.id = dt.id
          inst.name = dt.name
          inst.image = dt.image
          inst.description = dt.description
          instDetails.push(inst);
        }
      })
    })
    this.branchDetails.instructure_details = instDetails;

  }

  onAddcourse() {
    this.apiService.batchDetails = this.branchDetails;
    this.router.navigateByUrl('/Admin/auth/batch/addcourse');
  }


  onAddLearner() {
    this.apiService.batchDetails = this.branchDetails;
    this.router.navigateByUrl('/Admin/auth/batch/addlearner', { state: { type: this.branchDetails.user_details } });
  }

  createBatch() {
    if (!this.branchDetails.batchname || this.branchDetails.batchname.length == 0) {
      this.toast.warning('Batch name is mandatory');
    }
    else {
      this.addInst();
      this.apiService.create_batch(this.branchDetails.batchname, this.branchDetails.batchdescription, this.branchDetails.batchstartdate, this.branchDetails.batchenddate, this.branchDetails.user_details, this.branchDetails.course_details, this.branchDetails.instructure_details)
    }
  }

}
