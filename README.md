# Table of Contents
* [Summary](#summary)
    * [Packages](#packages)
    * [Init](#init)
    * [Directory Structure](#directory-structure)
    * [How to Add to this Project](#how-to-use)
* [Common Errors](#common-errors)
* [Query Syntax](#query-syntax)
    * [Naming Queries for the Frontend](#naming-queries-for-the-frontend)
    * [Using Keys to Differentiate Similar Queries](#using-keys-to-differentiate-similar-queries)
    * [Query Fragments for the Frontend](#query-fragments-for-the-frontend)
    * [Using Mutations to Modify the Backend](#using-mutations-to-modify-the-backend)
        * [Mutation Syntax](#mutation-syntax)
* [Verification](#verification)
    * [Using GraphQLNonNull to Require Values](#using-graphqlnonnull-to-require-values)
* [Types of Requests](#types-of-requests)
    * [GET](#get)
        * [Axios GET](#axios-get)
    * [POST](#post)
        * [Axios POST](#axios-post)
    * [PUT](#put)
        * [Axios PUT](#axios-put)
    * [DELETE](#delete)
        * [Axios DELETE](#axios-delete)
    * [PATCH](#patch)
        * [Axios PATCH](#axios-patch)
* [Glossary of Terms](#glossary-of-terms)

# Summary
This project is for practicing GraphQL in isolation (without the many complicating external factors), and uses the `GraphiQL` interface. It is divided into multiple directories, each with their own `server.js`/`schema.js` implementation, `README.md`, and `Dockerfile`. The purpose of these directories is to demonstrate different implementations and levels of complexity.
* `graphql_practice_no_database`: Simplest implementation, data is pulled from an object in `schema.js`.
* `graphql_practice_json_server`: Uses `json-server` for an API backend.

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

## Circular References
GraphQL code sometimes runs into issues with Circular References, due to JavaScript Closure Scopes. For an example and solution, see `/graphql_practice_json_server/README.md`'s `Bidirectional Reference` section.

# Query Syntax
The syntax for queries, such as what you would input in `graphiql` to get data back from the Backend. This is Frontend syntax.

<p align="center">
<img src="images/graphql_mutations_and_root_query.drawio.png" width="400" margin-left="auto" margin-right="auto">
</p>

## Naming Queries for the Frontend
Useful if you are working on the front-end you need to reuse/organize queries. For example:
```
query findCompany{
  company(id: "1"){
    id
    name
    description
  }
}
```
Versus:
```
{
  company(id: "1"){
    id
    name
    description
  }
}
```

## Using Keys to Differentiate Similar Queries
For example, if you need to call the `company` field in a root query more than once:
```
{
  apple: company(id: "1"){
    id
    name
    description
  }
  google: company(id: "2"){
    id
    name
    description
  }
}
```

The reason for this is that the response object can't have two identical keys:
```
{
  "data": {
    "apple": {
      "id": "1",
      "name": "Apple",
      "description": "iphone"
    },
    "google": {
      "id": "1",
      "name": "Apple",
      "description": "iphone"
    }
  }
}
```

## Query Fragments for the Frontend
This is useful for making queries much more readable as they become more complex (and repeated). For example, instead of this:
```
{
  apple:company(id: "1") {
    id
    name
    description
  }
  google:company(id: "1") {
    id
    name
    description
  }
}
```

We can use this:
```
{
  apple:company(id: "1") {
    ...companyDetails
  }
  google:company(id: "1") {
    ...companyDetails
  }
}
fragment companyDetails on Company{
  id
  name
  description
}
```

## Using Mutations to Modify the Backend
We can modify the Backend (`json-server` supports RESTful modification of the Backend) using mutations in GraphQL. Note that all mutations we add will be `fields` on the `mutation` object.

Warning: Mutations must be added to the `schema.js` export function to make them available to call, for example:
```
// Mostly the same as the Query type declaration, except in the resolve() function
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: { // Following naming conventions, we expect this to add a User to the User collection
            type: UserType, // Refers to the type of data that we are eventually going to return from resolve(), except in mutations it's not ALWAYS the same
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) }, // GraphQLNonNull = Validation (required), asserting that this value HAS to be included
                age: { type: new GraphQLNonNull(GraphQLInt) }, // GraphQLNonNull = Validation (required), asserting that this value HAS to be included
                companyId: { type: GraphQLString }
            },
            resolve(parentValue, { firstName, age }){
                return axios.post('http://localhost:3000/users', { firstName, age })
                    .then(res => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation // The mutation defined above, being shared with the rest of the app
})
```

### Mutation Syntax
When you call a Mutation, must ask for properties off it such as `id`, `firstName`, etc. This must match the Mutations resolve function.

**Add User Query**:
```
mutation {
  addUser(firstName: "Stephen", age: 26){
    id
    firstName
    age
  }
}
```
Response (`id` was randomly assigned):
```
{
  "data": {
    "addUser": {
      "id": "HyzCP7z5l",
      "firstName": "Stephen",
      "age": 26
    }
  }
}
```

**Delete User Query**:
```
mutation {
  deleteUser(id: "23"){
    id
  }
}
```
Response (`id` is required, even though the value returned was `null`). Keep in mind that it depends on the Backend response to fill in `id` in the response:
```
{
  "data": {
    "deleteUser": {
      "id": null
    }
  }
}
```

# Verification
## Using GraphQLNonNull to Require Values
`GraphQLNonNull()` is a Low level of validation for data via GraphQL and the backend. In other words, make a field required. For example, this means that the first name should be required `firstName: { type: new GraphQLNonNull(GraphQLString) }`. Only asserts that a value was passed in.

# Types of Requests
The following are communication methods between GraphQL and the backend server. Note that the `axios` specific implementations are relevant to `json-server` as described in `/graphql_practice_json_server/README.md`. These are typically used within GraphQL's `resolve()` function.

## GET
Gets something from the database.

### Axios GET
```
return axios.get(`http://localhost:3000/companies/${args.id}`) // Template string with backtics ``, not quotes!
    .then(resp => resp.data); // Compatibility between axios & GraphQL; only return data, not entire response object
```

## POST
Used for creation of a new entry.

### Axios POST
```
return axios.post('http://localhost:3000/users', { firstName, age })
    .then(res => res.data); // Compatibility between axios & GraphQL; only return data, not entire response object
```

## PUT
Completely replaces existing entry in the database.

### Axios PUT
```
return axios.put('http://localhost:3000/users', { firstName, age })
    .then(res => res.data); // Compatibility between axios & GraphQL; only return data, not entire response object
```

## DELETE
Removes the entry from the database.

### Axios DELETE
```
return axios.delete(`http://localhost:3000/users/${id}`, { })
    .then(res => res.data); // Compatibility between axios & GraphQL; only return data, not entire response object
```

## PATCH
Only replaces values that changed.

### Axios PATCH
```
return axios.patch(`http://localhost:3000/users/${id}`, { })
    .then(res => res.data); // Compatibility between axios & GraphQL; only return data, not entire response object
```

# Glossary of Terms
* `middleware`: `app.use('\graphql', expressGraphQL)` is an example of 'middleware'; middlewares intercept/modify requests as they come through express server
* `schema.js`: Inform GraphQL how our app data is arranged and how it can be accessed
* `graph`: A method of structuring RESTful routes
* `graphiql`: A tool that helps you structure GraphQL queries correctly. Is from the GraphQL Express library. [Guide](https://www.gatsbyjs.com/docs/how-to/querying-data/running-queries-with-graphiql/).
  * `doc panel`: In `graphiql`, on the right-hand side of the browser window, is a doc panel that interprets the `schema.js` and gradually grows as your `schema.js` grows. Very useful.
* `query`: Opposite of a `mutation`; Request data from the RESTful `graph`. Typically defined in `schema.js` as a `GraphQLObjectType` with naming convention of `<query_typ>Query`.
* `mutation`: Opposite of a `query`; manipulate the data in the RESTful `graph`.
* `root query`: Entrypoint into the data/application
* `resolve() function`: The function that actually makes the database calls; can be utilized `sync` OR `async` (by returning a `promise`). For the `sync` example see `graphql_practice_no_database`. For the `async` example see `graphql_practice_json_server`.
* `lodash`: Helper function for working with collections of data
* `json-server`: A tiny, extremely helpful JSON Server for dev environments
* `json.db`: The data storage file for `json-server`, and what you will likely have to modify if you make changes to this mock backend
* `fetch`: Native command used to make HTTP requets.
* `Axios`: Tool for making HTTP requests. More useful than `fetch`, but it is a third-party library.
* `GraphQL Type`: In GraphQL, types such as `strings` and `ints` are declared using `GraphQLString` and `GraphQLInt`, etc.
* `GraphQLNonNull()`: Low level validation for data via GraphQL. In other words, make a field required. For example, this means that the first name should be required `firstName: { type: new GraphQLNonNull(GraphQLString) }`. Only asserts that a value was passed in.