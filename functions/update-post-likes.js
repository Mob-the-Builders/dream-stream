// update-post-likes.js

const query = require('./utils/query');

const UPDATE_POST_LIKES = `
    mutation($id: ID!, $likes: [String!]){
        updateLikes(id: $id, data: {likes: $likes}){
            likes
        }
    }
`;

exports.handler = async (event) => {
  const { id, likes } = JSON.parse(event.body);
  console.log(likes);
  const { data, errors } = await query(
    UPDATE_POST_LIKES, { id, likes },
  );
  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  console.log(id);
  console.log(likes);
  console.log(data);
  return {
    statusCode: 200,
    body: JSON.stringify({ updatedLikes: data.updateLikes }),
  };
};
