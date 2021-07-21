 // get-posts.js

const query = require("./utils/query");

const LOGIN = `
  query getUserByName($userName: String){
    getUserByName(userName: $userName){
 	    password    
  }
}
`;

 exports.handler = async event => {
    const { userName, password } = JSON.parse(event.body);
    console.log( userName, password)
    const { data, errors } = await query(LOGIN, {userName} );
    

    if (errors) {
       return {
         statusCode: 500,
         body: JSON.stringify(errors)
       };
    }

    if(data.getUserByName !== null && password===data.getUserByName.password) {
      return {
        statusCode: 200,
        body: JSON.stringify({ messages: "success"})
      };
    }


    return {
      statusCode: 401,
      body: JSON.stringify({ messages: "Wrong username or password" })
    };
  };
