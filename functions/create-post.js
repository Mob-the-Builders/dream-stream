// create-post.js

const query = require("./utils/query");

const CREATE_POST = `
  mutation($userName: String!, $image: String!, $description: String!, $tags: [String!], $likes: [String!]){
    createPost(data: {userName: $userName, image: $image, description: $description, tags: $tags, likes: $likes}){
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
  const { userName, image, description, tags, likes } = JSON.parse(event.body);
  const { data, errors } = await query(
          CREATE_POST, { 
  userName, image, description, tags, likes });

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ testimonial: data.createPost })
  };
};
