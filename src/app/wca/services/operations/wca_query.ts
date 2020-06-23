import gql from "graphql-tag";

export const remove_doc_ref = gql`
  query remove_doc_ref($doc_id: String!){
    remove_doc_ref(doc_id: $doc_id ) {
        message
        success
    }
  }`;

  export const getallrefdoc = gql`
  query getallrefdoc($pagenumber:Int!, $course_id:String!){
    getallrefdoc(pagenumber:$pagenumber,course_id:$course_id) {
      data{
      module_id
      topic_id
      _id
      type
      type_name
      files{
        path
        doc_type
      }
      doc_type
      created_on
    }
    success
    count
    message
        }
    
  }`;
  export const get_module_topic = gql`
  query remove_doc_ref{
    remove_doc_ref {
      data{
        data{
          modulename
        }
      }
    }
  }`;