// get-posts-by-tag.js

 const query = require("./utils/query");
//findAllPosts
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

  exports.handler = async event => {
    console.log('GET COMMENTS BY POST ID!!!!!!!!! ')
    
    const { id } = JSON.parse(event.body);
    console.log(id)
    const { data, errors } = await query(GET_COMMENTS_BY_ID, { id });
    console.log(data);
    console.log(data.findPostByID.comments.data);
    if (errors) {
        return {
          statusCode: 500,
          body: JSON.stringify(errors)
        };
     }

     return {
       statusCode: 200,
       body: JSON.stringify({ messages: data.findPostByID.comments.data })
     };
   };
