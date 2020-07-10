import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { create_batch, read_batch } from './batch-management.gql';

@Injectable({
  providedIn: 'root'
})
export class batchService {

  constructor(private http: HttpClient,private Apollo: Apollo) { }

  create_batch(batchname, batchdescription, batchstartdate, batchenddate,user_details,course_details,instructur_details) {
    return this.Apollo.query({
      query: create_batch,
      variables: {
        batchname,
        batchdescription,
        batchstartdate,
        batchenddate,
        user_details,
        course_details,
        instructur_details
      }
    });
  }

  getBatch() {
    return this.Apollo.query({
      query: read_batch
    });
  }

}
