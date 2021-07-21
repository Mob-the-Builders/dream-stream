 // get-posts-by-tag.js

 const query = require("./utils/query");

 const GET_BY_TAG = `
     query getByTag($tags: String){
        getByTag(tags: $tags){ 
          data{
              _id
              userName
              image
              description
              tags
              likes
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

  exports.handler = async event => {
    const { tags } = JSON.parse(event.body);
    const { data, errors } = await query(GET_BY_TAG, {tags} );

     if (errors) {
        return {
          statusCode: 500,
          body: JSON.stringify(errors)
        };
     }

     return {
       statusCode: 200,
       body: JSON.stringify({ messages: data.getByTag.data })
     };
   };
