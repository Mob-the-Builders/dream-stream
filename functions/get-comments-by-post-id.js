// get-comments-by-post-id.js
const query = require('./utils/query');

const GET_COMMENTS_BY_ID = `
     query findPostByID($id: ID!){
      findPostByID(id: $id){
        comments {
          data {
            userName
            message
          }
        }
        }
      }
 `;

exports.handler = async (event) => {
  const { id } = JSON.parse(event.body);
  const { data, errors } = await query(GET_COMMENTS_BY_ID, { id });
  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ messages: data.findPostByID.comments.data }),
  };
};
