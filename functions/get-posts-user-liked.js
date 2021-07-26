// get-posts-user-liked.js

const query = require('./utils/query');

const GET_POSTS_LIKE_BY_NAME = `
     query getPostLikeByName($userName: String){
      getPostLikeByName(userName: $userName){ 
          data{
            post{
              _id
              userName
              image
              description
              tags
              likes {
                data{
                  _id
                  userName
                }
              }
              comments {
                data {
                  userName
                  message    
               }
             }
            }
           }
          }
         }
 `;

exports.handler = async (event) => {
  const { userName } = JSON.parse(event.body);
  const { data, errors } = await query(GET_POSTS_LIKE_BY_NAME, { userName });

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ messages: data.getPostLikeByName.data }),
  };
};
