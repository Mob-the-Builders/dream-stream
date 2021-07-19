// delete-post.js

const query = require("./utils/query");

const DELETE_POST = `
  mutation($id: ID!) {
    deletePost(id: $id){
      _id
    }
  }
`;

exports.handler = async event => {
  const { id } = JSON.parse(event.body);
  const { data, errors } = await query(
        DELETE_POST, { id });

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ deletedPost: data.deletePost 
   })
  };
};
