import gql from "graphql-tag";

export const remove_doc_ref = gql`
  query remove_doc_ref($doc_id: String){
    remove_doc_ref(doc_id: $doc_id ) {
        message
        success
    }
  }`;

  export const getallrefdoc = gql`
  query getallrefdoc{
    getallrefdoc {
        message{
            _id
          type
          type_name
          path
          doc_type
        }
          success
        }
    
  }`;
  