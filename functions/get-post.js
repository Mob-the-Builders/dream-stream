// get-posts.js
const query = require('./utils/query');

const GET_POSTS = `
     query {
         allPosts(_size: 1000) {
           data {
              _id
              userName
              title
              date
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
 `;

exports.handler = async () => {
  const { data, errors } = await query(GET_POSTS);

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ messages: data.allPosts.data }),
  };
};
