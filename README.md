# Table of Contents
* [Summary](#summary)
    * [Packages](#packages)
    * [Init](#init)
    * [Directory Structure](#directory-structure)
    * [How to Use](#how-to-use)
* [Common Errors](#common-errors)
* [Glossary of Terms](#glossary-of-terms)

# Summary
This project is for practicing GraphQL in isolation.

To view in a browser, go to: `localhost:4000/graphql`

50% of the effort in GraphQL is writing your `schema.js`. The other 50% is writing `queries` for your `schema.js`.

## Packages
* `npm`: Command for installing packages
* `express`: Handling incoming HTTP requests and sending responses to users  
* `express-graphql`: Compatibility layer between `express` and `graphql`
* `graphql`: Graphql library for crawling Graphs
* `lodash`: Utility functions that are useful

## Init
1. `cd` into the `graphql_practice/users` directory
2. `npm init`
3. `npm install --save express express-graphql graphql lodash`
4. Put together the bare essentials of an express server to start a new express application and listen to an outside port (see below)

## Directory Structure
```
.
├── README.md
└── users
    ├── package-lock.json
    ├── package.json
    ├── schema
    │   └── schema.js
    └── server.js
```

## How to Use
To practice GraphQL in isolation, this project makes use of a minimal `express` server (`server.js`) and replaces a call to a database with hardcoded data held within the script itself (the `user` variable inside `schema.js`).

The workflow is as follows:
1. Construct your `graphql` `schema.js`. Includes the following:
  * Configure 'mock database' object `users`
  * Configure your data 'types', mapping them to GraphQL types i.e.: `UserType = new GraphQLObjectType`
  * Configure your `root query` i.e.: `RootQuery = new GraphQLObjectType`
2. Start/Docker Build & Run the `express` server (see below)

### Local
First, `cd` into the `graphql-practice-server/users` directory.

Start `express` server:
* `node server.js`

While the `express` server is running, go to `localhost:4000/graphql`.

If you make changes to `schema.js`, restart the `express` server.

### Running the Docker Container
Start the container:
* `docker run -p4000:4000 graphiql_local_test`

Then go to `localhost:4000/graphql` in your browser.

## Building the Docker Container
First, `cd` into the `graphql-practice-server` directory.

Run the following command:
* `docker build -t graphiql_local_test .`

# Common Errors
## Syntax Error: GraphQL Request
Commonly occurs if you make a mistake in the `root query` input. For example, if your `query` is `{user(){firstName}}` (wrong) instead of `{user(id: "23"){firstName}}` (right).

## Null Value Returned
If the input you provide to the `root query` doesn't exist in the database, a `null` value will be returned. For example:
* Input: `{user(id: "412325"){firstName}}` (doesn't exist)
* Output: `{"data": {"user": null}}`

A correct input looks like:
* Input: `{user(id: "47"){firstName}}`
* Output: `{"data": {"user": {"firstName": "Samantha"}}}`

# Glossary of Terms
* `middleware`: `app.use('\graphql', expressGraphQL)` is an example of 'middleware'; middlewares intercept/modify requests as they come through express server
* `schema.js`: Inform GraphQL how our app data is arranged and how it can be accessed
* `graph`: A method of structuring RESTful routes
* `graphiql`: A tool that helps you structure GraphQL queries correctly. Is from the GraphQL Express library. [Guide](https://www.gatsbyjs.com/docs/how-to/querying-data/running-queries-with-graphiql/).
  * `doc panel`: In `graphiql`, on the right-hand side of the browser window, is a doc panel that interprets the `schema.js` and gradually grows as your `schema.js` grows. Very useful.
* `query`: A request made of the RESTful `graph`
* `root query`: Entrypoint into the data/application
* `resolve() function`: The function that actually makes the database calls
* `lodash`: Helper function for working with collections of data