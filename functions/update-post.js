// update-post.js

const query = require("./utils/query");

const UPDATE_POST = `
    mutation($id: ID!, $userName: String!, $image: String!, $description: String!, $tags: [String!], $likes: [String!]){
        updatePost(id: $id, data: {userName: $userName, image: $image, description: $description, tags: $tags, likes: $likes}){
            _id
            userName
            image
            description
            tags
            likes
        }
    }
`;

exports.handler = async event => {
  const { id, userName, image, description, tags, likes } = JSON.parse(event.body);
  const { data, errors } = await query(
       UPDATE_POST, { id, userName, image, description, tags, likes });

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ updatedPost: 
data.updatePost })
  };
};
