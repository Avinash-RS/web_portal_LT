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
            area_of_interest
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
