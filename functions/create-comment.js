// create-comment.js

const query = require('./utils/query');

const CREATE_COMMENT = `
  mutation( $userName: String!, $message: String!, $postId: ID!){
    createComment(data: {userName: $userName, message: $message, post: {connect: $postId} }){
      userName
      message
      post{
        userName
        image
        description
      }
    }
  }
`;

exports.handler = async (event) => {
  const { userName, message, postId } = JSON.parse(event.body);
  const { data, errors } = await query(
    CREATE_COMMENT, { userName, message, postId },
  );

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ Comment: data.createComment }),
  };
};
