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
    instructure_details: []
  };
  selectedInst = [];
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
        if (dt._id == val) {
          inst.id = dt._id
          inst.name = dt.name
          inst.image = dt.image
          inst.description = dt.description
          instDetails.push(inst);
        }
      })
    })
    this.branchDetails.instructure_details = instDetails;

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
