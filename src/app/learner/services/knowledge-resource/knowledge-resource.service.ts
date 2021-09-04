import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Apollo } from 'apollo-angular';
import { particular_resource_details, resource_details, update_resource_details } from './knowledge-resource.gql';


@Injectable({
    providedIn: 'root'
})
// tslint:disable-next-line:class-name
export class knowledgeService {
    httpOptions;
    constructor(private http: HttpClient, private apollo: Apollo) { }

    getToken(){
        const token = localStorage.getItem('token')||sessionStorage.getItem('token'); 
        var userDetails = JSON.parse(localStorage.getItem('UserDetails'))
        this.httpOptions = {
          headers: new HttpHeaders({ 
            Authorization: token,
            _id: btoa(userDetails['user_id'])
           })
        };
      }
    getResourceDetails() {
        return this.apollo.query({
            query: resource_details
        });
    }

    // tslint:disable-next-line:variable-name
    getParticularResourceDetails(domain, area_of_interest) {
        return this.apollo.query({
            query: particular_resource_details,
            variables: {
                domain,
                area_of_interest
            }
        });
    }

    uploadResourceDetail(formData) {
        return this.http.post(environment.wcaapiurl + 'api/upload/uploadresourcefile', formData,this.httpOptions);
    }

    saveResourceData(knowledgeDetails) {
        return this.apollo.query({
            query: update_resource_details,
            variables: knowledgeDetails

        });
    }

}



