import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Apollo } from 'apollo-angular';
import { resource_details, particular_resource_details, update_resource_details } from './knowledge-resource.gql';

@Injectable({
    providedIn: 'root'
})
export class knowledgeService {

    constructor(private http: HttpClient, private apollo: Apollo) { }


    getResourceDetails() {
        return this.apollo.query({
            query: resource_details
        });
    }

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
        return this.http.post(environment.wcaapiurl + 'api/upload/uploadresourcefile', formData);
    }

    saveResourceData(knowledgeDetails) {
        return this.apollo.query({
            query: update_resource_details,
            variables: knowledgeDetails

        });
    }

}