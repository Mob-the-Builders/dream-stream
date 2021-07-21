// create-user.js

const query = require("./utils/query");

const CREATE_USER = `
mutation ($userName: String!, $password: String!) {
  createUser(data: { userName: $userName, password: $password} ) {
      userName
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

  return {
    statusCode: 200,
    body: JSON.stringify({ message: `User ${data.createUser.userName} created` })
  };
};
