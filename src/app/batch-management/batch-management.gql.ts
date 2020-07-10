import gql from 'graphql-tag';

export const create_batch = gql`
  mutation create_batch($batchname: String!, $batchdescription: String,$batchstartdate:object,$batchenddate:object,$user_details:object) {
    create_batch(
        batchname: $batchname
        batchdescription: $batchdescription,
        batchstartdate: $batchstartdate,
        batchenddate: $batchenddate,
        user_details:$user_details
    ) {
      message
      success
    }
  }
`;