# Table of Contents
* [Summary](#summary)
    * [Packages](#packages)
    * [Init](#init)
    * [Directory Structure](#directory-structure)
    * [How to Add to this Project](#how-to-use)
* [Common Errors](#common-errors)
* [Glossary of Terms](#glossary-of-terms)

# Summary
This project is for practicing GraphQL in isolation (without the many complicating external factors), and uses the `GraphiQL` interface. It is divided into multiple directories, each with their own `server.js`/`schema.js` implementation, `README.md`, and `Dockerfile`.

## Packages
These are the repo-wide packages necessary. See specific project folders for additional packages specific to that project.
* `npm`: Command for installing packages
* `express`: Handling incoming HTTP requests and sending responses to users  
* `express-graphql`: Compatibility layer between `express` and `graphql`
* `graphql`: Graphql library for crawling Graphs
* `lodash`: Utility functions that are useful

## Directory Structure
To regenerate this directory structure, use `tree -IC "node_modules"` (`-I "node_modules"` ignores the `node_modules` directory for brevity, `-C` colors the output).
```
.
├── README.md
├── graphql_practice_json_server
│   ├── Dockerfile
│   ├── README.md
│   ├── images
│   │   └── graphql_practice_server_schema_database.drawio.png
│   ├── package-lock.json
│   ├── package.json
│   ├── schema
│   │   └── schema.js
│   └── server.js
├── graphql_practice_no_database
│   ├── Dockerfile
│   ├── README.md
│   ├── images
│   │   └── graphql_practice_server_schema_database.drawio.png
│   ├── package-lock.json
│   ├── package.json
│   ├── schema
│   │   └── schema.js
│   └── server.js
└── images
```

## How to Add to this Project
To add a new GraphQL practice implementation, create a new directory and name it something relevant i.e. `graphql_practice_<name>`.

Follow the directions in the [init](#init) section.

Use the `Dockerfile` to implement that particular implementations dockerization.

Create a custom `README.md` for the new project that follows the structure of other `README.md`'s you see in this project.

If you come across a common error for your implementation, add it similar to [Common Errors](#common-errors) below in the `README.md` you created.

Try to be as descriptive as possible so others can learn the implementation!

If you need to add images to your `README.md` (who doesn't like having a diagram?), create an `images` folder in your implementation's directory and then save the image there. Use HTML to add the image and properly center it. If you are curious how this is done, check out the other `README.md`'s in this project.

### Init
1. `cd` into the `graphql-practice-server/<new_practice_server>` directory
2. `npm init`
3. `npm install --save express express-graphql graphql lodash`
4. Put together the bare essentials of an express server to start a new express application and listen to an outside port. See the `graphql_practice_no_database` directory for the bare bones example of this.

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