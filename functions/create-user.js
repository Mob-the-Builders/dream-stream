// create-user.js
const query = require('./utils/query');

const CREATE_USER = `
mutation ($userName: String!, $password: String!) {
  createUser(data: { userName: $userName, password: $password} ) {
      _id
      userName
   }
}
`;

const CREATE_USER_TAGS = `
mutation ($tags: [String!] $userId: ID!) {
  createUserTags(data: { tags: $tags, user: { connect: $userId } } ) {
      _id
      tags
   }
}
`;

exports.handler = async (event) => {
  const { userName, password } = JSON.parse(event.body);
  const { data, errors } = await query(
    CREATE_USER, { userName, password },
  );

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }
  const userId = data.createUser._id;
  const tags = [];
  const { data: dataTag, errors: errorsTag } = await query(
    CREATE_USER_TAGS, { tags, userId },
  );
  if (errorsTag) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: `User ${data.createUser.userName} created.` }),
  };
};
