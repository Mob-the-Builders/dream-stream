 // get-posts.js
// WE NEED TO A USER TO COMMENTS!!!!!

 const query = require("./utils/query");

 const GET_POSTS = `
     query {
         allPosts {
           data {
              _id
              userName
              image
              description
              tags
              likes
              comments {
                data {
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
          body: JSON.stringify(errors)
        };
     }

     return {
       statusCode: 200,
       body: JSON.stringify({ messages: data.allPosts.data })
     };
   };
