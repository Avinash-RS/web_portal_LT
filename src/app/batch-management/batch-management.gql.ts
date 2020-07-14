import gql from 'graphql-tag';

export const create_batch = gql`
  mutation create_batch($batchname: String!, 
    $batchdescription: String,
    $batchstartdate:String,
    $batchenddate:String,
    $user_details:[batch_user_details],
    $course_details:[batch_course_details],
    $instructur_details:[batch_instructur_details]) {
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