import gql from "graphql-tag";

export const remove_doc_ref = gql`
  query remove_doc_ref($doc_id: String){
    login(doc_id: $doc_id ) {
        message
        success
    }
  }`;

  export const getallrefdoc = gql`
  query remove_doc_ref{
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
  