import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable, } from 'rxjs';
import { tap } from 'rxjs/operators'
import { Apollo } from "apollo-angular";
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlobServicesService {

  constructor(private http: HttpClient) { }

  private urlAPI = environment.wcaapiurl + 'api/azureStorage' + '/readBlodContainer';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  };

  getContainerBlobs(): Observable<any> {
    return this.http.get(this.urlAPI, this.httpOptions).pipe(tap());
  }

}
