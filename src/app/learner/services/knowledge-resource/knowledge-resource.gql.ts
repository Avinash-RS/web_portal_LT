import gql from "graphql-tag";


export const resource_details = gql`
query{
get_all_resources_details{
    success
    error_msg
    message{
            _id
            documentname
            file
            domain
            thumbnail
            area_of_interest
            thumbnail
            created_on
            createdby_role
            createdby_name
            createdby_id
    }
 }
}
`;

export const particular_resource_details = gql`
query get_all_resources_details($domain: String,$area_of_interest: String) {
        get_all_resources_details(
            domain:$domain,
            area_of_interest:$area_of_interest){
            success
            error_msg
            message{
                    _id
                    documentname
                    file
                    domain
                    topic
                    url
                    filename
                    thumbnail
                    area_of_interest
                    created_on
                    createdby_role
                    createdby_name
                    createdby_id
            }
        }
    }`

export const update_resource_details = gql`
    mutation
    save_resource_data(
      $documentname: String!
      $file: String!
      $createdby_role: String!
      $createdby_name: String!
      $createdby_id: String!){
        save_resource_data(
                documentname: $documentname
                file: $file
                createdby_role: $createdby_role
                createdby_name: $createdby_name
                createdby_id: $createdby_id
        ) {
          message
          success
          error_msg
        }
    }`

    export const get_source_report = gql `
    query{

      get_source_report{
  
          success
  
          error_msg
  
          message{
  
              _id
  
              createdon
  
              status
  
              count
  
          }
  
      }
  
  }`
    
export const get_Knowlegde_ResourceReport = gql`
  query getKnowlegdeResourceReport($reportid: String!){
    getKnowlegdeResourceReport(reportid: $reportid) {
      success
      message {
        _id
        resourceid
        status
        documentname
        file
        domain
        area_of_interest
        formate
        topic
        filename
        url
        thumbnail
        created_on
        createdby_role
        createdby_name
        createdby_id
      }
    }
  }
`;