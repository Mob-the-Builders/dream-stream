// create-user.js

const query = require("./utils/query");

const CREATE_USER = `
mutation ($userName: String!, $password: String!) {
  createUser(data: { userName: $userName, password: $password} ) {
      _id
      userName
   }
}
`;

const CREATE_USER_TAGS = `
mutation ($userId: ID!) {
  createUser(data: { tags: [], user: $userId } ) {
      tags
   }
}
`;

exports.handler = async event => {
  const { userName, password } = JSON.parse(event.body);
  const { data, errors } = await query(
          CREATE_USER, { 
  userName, password });

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    };
  }
  const id = data.createUser._id

  const { dataTags, errorsTags } = await query(
    CREATE_USER_TAGS, { 
      userName, password });
  
    // if (errorsTags) {
    //   return {
    //     statusCode: 500,
    //     body: JSON.stringify(errorsTags)
    //   };
    // }  

  return {
    statusCode: 200,
    body: JSON.stringify({ message: `User ${data.createUser.userName} created` })
  };
};
