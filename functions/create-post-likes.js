// create-post-likes.js
const query = require('./utils/query');

const CREATE_POST_LIKES = `
  mutation( $userName: String!, $postId: ID!){
    createLikes(data: {userName: $userName, post: {connect: $postId} }){
      _id
      userName
    }
  }
`;

exports.handler = async (event) => {
  const { postId, userName } = JSON.parse(event.body);
  const { data, errors } = await query(
    CREATE_POST_LIKES, { postId, userName },
  );
  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ like: data.createLikes }),
  };
};
