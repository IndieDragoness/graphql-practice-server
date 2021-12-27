// Summary
//   This script manages the express server for learning GraphQL.
//   From course page: https://www.udemy.com/course/graphql-with-react-course/learn/lecture/6523018#overview
//   Express API: https://expressjs.com/en/api.html
//   Running an Express GraphQL Server: https://graphql.org/graphql-js/running-an-express-graphql-server/

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

// Instantiate express server
const app = express();

// app.use is an example of 'middleware'; middlewares intercept/modify requests as they come through express server
// If there's any routes using graphql, we want the graphql library to handle it:
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true // Dev tool allows us to make queries against dev server (turn off for prod)
}));

// Starts a UNIX socket and listens for connections
app.listen(4000, () => {
    console.log('Running! Go to localhost:4000/graphql to view.');
});