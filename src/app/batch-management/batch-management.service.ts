import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { create_batch, read_batch } from './batch-management.gql';
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

  getBatch() {
    return this.Apollo.query({
      query: read_batch
    });
  }

}
