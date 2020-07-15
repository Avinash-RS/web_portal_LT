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
    instructur_details: []
  };
  selectedInst = [];
  isEdit: boolean;
  isBatchId: boolean;
  isEnable: boolean;
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
      else if (params.batchId && params.batchId.length > 0) {
        this.isBatchId = true;
        this.isEnable = true;
        this.getBatchDetails(params.batchId);
      }
    });
  }


  setStep(index: number) {
    this.step = index;
  }

  getBatchDetails(id) {
    this.apiService.getParticularBatch(id).subscribe((data: any) => {
          this.branchDetails = data.data.read_batch.message[0];
    })
  }

  onEditBatch() {
    this.isEnable = false;
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
          // inst.description = dt.description
          instDetails.push(inst);
        }
      })
    })
    this.branchDetails.instructur_details = instDetails;

  }

  onAddcourse() {
    if (this.isBatchId) {
      return false;
    }
    this.apiService.batchDetails = this.branchDetails;
    this.router.navigateByUrl('/Admin/auth/batch/addcourse');
  }


  onAddLearner() {
    if (this.isBatchId) {
      return false;
    }
    this.apiService.batchDetails = this.branchDetails;
    this.router.navigateByUrl('/Admin/auth/batch/addlearner', { state: { type: this.branchDetails.user_details } });
  }

  createBatch() {
    if (!this.branchDetails.batchname || this.branchDetails.batchname.length == 0) {
      this.toast.warning('Batch name is mandatory');
    }
    else {
      this.addInst();
      this.apiService.create_batch(this.branchDetails).subscribe((data: any) => {
        if (data.data.create_batch.success) {
          this.apiService.batchDetails = undefined;
          this.toast.success("Batch created successfully");
          this.router.navigateByUrl('/Admin/auth/batch');
        }
      })
    }
  }

  updateBatch() {
    if (!this.branchDetails.batchname || this.branchDetails.batchname.length == 0) {
      this.toast.warning('Batch name is mandatory');
    }
    else {
      this.addInst();
      this.apiService.update_batch(this.branchDetails).subscribe((data: any) => {
        if (data.data.update_batch.success) {
          this.apiService.batchDetails = undefined;
          this.toast.success("Batch updated successfully");
          this.router.navigateByUrl('/Admin/auth/batch');
        }
      })
    }
  }

}
