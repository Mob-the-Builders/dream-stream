// get-likes-by-post-id.js
const query = require('./utils/query');

const GET_LIKES_BY_ID = `
     query findPostByID($id: ID!){
      findPostByID(id: $id){
        likes {
          data{
            _id
            userName
          }
        }
      }
    }
 `;

exports.handler = async (event) => {
  console.log('GET LIKES BY POST ID!!!!!!!!! ');

  const { id } = JSON.parse(event.body);
  console.log(id);
  const { data, errors } = await query(GET_LIKES_BY_ID, { id });
  console.log(data);
  console.log(data.findPostByID.likes.data);
  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ likes: data.findPostByID.likes.data }),
  };
};
