// create-post.js
const { DateTime } = require('luxon');
const query = require('./utils/query');

const CREATE_POST = `
  mutation($image: String!, $title: String, $imageDelete: String!, $description: String!, $date: String!, $tags: [String!],$userName: String!){
    createPost(data: {userName: $userName, title: $title, image: $image, imageDelete: $imageDelete, description: $description, date: $date, tags: $tags}){
      _id
      userName
      title
      image
      description
      date
      tags
      }
    }
`;

exports.handler = async (event) => {
  const {
    userName, title, image, imageDelete, description, tags,
  } = JSON.parse(event.body);
  const date = DateTime.utc();
  const { data, errors } = await query(
    CREATE_POST, {
      userName, title, date, image, imageDelete, description, tags,
    },
  );

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ Post: data.createPost }),
  };
};
