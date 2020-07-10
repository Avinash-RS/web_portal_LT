import gql from 'graphql-tag';

export const create_batch = gql`
  mutation create_batch($batchname: String!, 
    $batchdescription: String,
    $batchstartdate:object,
    $batchenddate:object,
    $user_details:object,
    $course_details:object,
    $instructur_details:object) {
    create_batch(
        batchname: $batchname
        batchdescription: $batchdescription,
        batchstartdate: $batchstartdate,
        batchenddate: $batchenddate,
        user_details:$user_details,
        course_details:$course_details,
        instructur_details:$instructur_details
    ) {
      message
      success
    }
  }
`;

export const read_batch = gql`
  query read_batch{
    read_batch {
      success
      message{
        _id
        batchname
        batchdescription
        batchstartdate
        batchenddate
        created_on
        batchid
        user_details{
            id
            name
            image
        },
        course_details{
            id
            name
            image
        },
        instructur_details{
            id
            name
            image
        }
    }
    }
  }`;