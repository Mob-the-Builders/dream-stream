// get-tags-user.js
const query = require('./utils/query');

const LOGIN = `
   query getUserByName($userName: String){
     getUserByName(userName: $userName){
        userTags{
         _id
         tags
       }   
   }
 }
 `;

exports.handler = async (event) => {
  const { userName } = JSON.parse(event.body);
  const { data, errors } = await query(LOGIN, { userName });
  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }
  if (data.getUserByName) {
    return {
      statusCode: 200,
      body: JSON.stringify({ messages: 'success', userTags: data.getUserByName.userTags.tags }),
    };
  }
  return {
    statusCode: 500,
    body: JSON.stringify({ messages: 'error' }),
  };
};
