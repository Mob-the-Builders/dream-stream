// update-user-tags.js

const query = require('./utils/query');

const UPDATE_USER_TAGS = `
    mutation($id: ID!, $tags: [String!]){
        updateUserTags(id: $id, data: {tags: $tags}){
            tags
        }
    }
`;

exports.handler = async (event) => {
  const { id, tags } = JSON.parse(event.body);
  const { data, errors } = await query(
    UPDATE_USER_TAGS, { id, tags },
  );

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ updatedPost: data.updateUserTags.tags }),
  };
};
