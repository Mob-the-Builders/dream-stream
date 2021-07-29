import sharp from 'sharp';

exports.handler = async (event) => {
  
  const { test, errors } = JSON.parse(event.body);
  console.log(sharp);
  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  if (test) {
    return {
      statusCode: 200,
      body: JSON.stringify({ messages: 'success', lol: test }),
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({ messages: 'Wrong username or password' }),
  };
};
