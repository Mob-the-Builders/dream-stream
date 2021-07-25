// create-post.js
const query = require('./utils/query');
const { DateTime } = require('luxon');

const CREATE_POST = `
  mutation($image: String!, $imageDelete: String!, $description: String!, $tags: [String!],$userName: String!){
    createPost(data: {userName: $userName, image: $image, imageDelete: $imageDelete, description: $description, tags: $tags}){
      _id
      userName
      image
      description
      tags
      likes {
        likes
      }
    }
  }
`;

const CREATE_POST_LIKE = `
mutation ($likes: [String!] $postId: ID!) {
  createLikes(data: { likes: $likes, post: { connect: $postId } } ) {
      _id
      likes
   }
}
`;

exports.handler = async (event) => {
  const {
  //const date = DateTime.now().toFormat('f');
    userName, image, imageDelete, description, tags,
  } = JSON.parse(event.body);
  const { data, errors } = await query(
    CREATE_POST, {
      userName, image, imageDelete, description, tags,
    },
  );

  if (errors) {
    console.log('FIRST');
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  const postId = data.createPost._id;
  const likes = [];
  const { data: dataLike, errors: errorsLike } = await query(
    CREATE_POST_LIKE, { likes, postId },
  );
  if (errorsLike) {
    console.log('SECOND');
    return {
      statusCode: 500,
      body: JSON.stringify(errorsLike),
    };
  }
  console.log(dataLike);

  return {
    statusCode: 200,
    body: JSON.stringify({ Post: data.createPost, likesId: dataLike.createLikes._id }),
  };
};
