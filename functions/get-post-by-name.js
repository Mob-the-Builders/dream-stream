
// getPostByName(userName: String): [Post!]!
const query = require('./utils/query');

const GET_BY_NAME = `
     query getPostByName($userName: String){
      getPostByName(_size: 1000, userName: $userName){ 
          data{
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
 `;


exports.handler = async (event) => {
  console.log("hello serverless");
  const { userName } = JSON.parse(event.body);
  const { data, errors } = await query(GET_BY_NAME, { userName });
  console.log(data);

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ messages: data.getPostByName.data }),
  };
};
