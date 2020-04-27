import gql from "graphql-tag";

export const remove_doc_ref = gql`
  query remove_doc_ref($doc_id: String!){
    remove_doc_ref(doc_id: $doc_id ) {
        message
        success
    }
  }`;

  export const getallrefdoc = gql`
  query getallrefdoc($pagenumber:Int!){
    getallrefdoc(pagenumber:$pagenumber) {
      data{
      module_id
      _id
      type
      type_name
      path
      doc_type
      created_on
    }
    success
    message
        }
    
  }`;
  