import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlobServicesService {

  constructor(private http: HttpClient) { }

  private urlAPI = environment.wcaapiurl + 'api/azureStorage';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  };

  getContainerBlobs(): Observable<any> {
    return this.http.get(this.urlAPI + '/readBlodContainer', this.httpOptions).pipe(tap());
  }

  getContainerBlobs_VTTFiles(): Observable<any> {
    return this.http.get(this.urlAPI + '/getSubtitlesContainer', this.httpOptions).pipe(tap());
  }

}
