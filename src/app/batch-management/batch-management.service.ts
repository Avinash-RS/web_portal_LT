import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { create_batch, read_batch, read_particular_batch, update_batch,get_scheduled_activity } from './batch-management.gql';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class batchService {

  batchDetails: any;

  constructor(private http: HttpClient,private Apollo: Apollo) { }

  create_batch(batchDetails) {
    return this.Apollo.query({
      query: create_batch,
      variables: batchDetails
    });
  }

  update_batch(batchDetails) {
    return this.Apollo.query({
      query: update_batch,
      variables: batchDetails
    });
  }

getParticularBatch(batchid) {

  return this.Apollo.query({
    query: read_particular_batch,
    variables: {
      batchid
    }
  });
}

  getBatch() {
    return this.Apollo.query({
      query: read_batch
    });
  }

  getScheduleDetails(batchid){
    debugger;
    return this.Apollo.query({
      query: get_scheduled_activity,
      variables: {
        batchid
      }
    });
  }
}
