// delete-post-likes.js
const query = require('./utils/query');

const DELETE_LIKE = `
  mutation($id: ID!) {
    deleteLikes(id: $id){
      _id
      userName
    }
  }
`;

exports.handler = async (event) => {
  const { id } = JSON.parse(event.body);
  const { data, errors } = await query(
    DELETE_LIKE, { id },
  );

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ deletedLike: data.deleteLikes }),
  };
};
