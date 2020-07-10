import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WcaService } from '@wca/services/wca.service';
import { ToastrService } from 'ngx-toastr';
import { batchService } from '../batch-management.service';

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
  constructor(
    private wcaService: WcaService,
    public toast: ToastrService,
    private apiService: batchService) {
  }

  ngOnInit() {

    this.getInsructors();
  }


  setStep(index: number) {
    this.step = index;
  }

  getInsructors() {
    this.wcaService.getAllInstructors().subscribe((data: any) => {
      this.instructors = data.Result;
    });
  }

  instrucSelection(e) {

    

  }

  createBatch() {
    if (!this.branchDetails.batchname || this.branchDetails.batchname.length == 0) {
      this.toast.warning('Batch name is mandatory');
    }

    this.apiService.create_batch(this.branchDetails.batchname, this.branchDetails.batchdescription,this.branchDetails.batchstartdate,this.branchDetails.batchenddate,this.branchDetails.user_details,this.branchDetails.course_details,this.branchDetails.instructur_details)
  }

}
