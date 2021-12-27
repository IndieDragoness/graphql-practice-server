# Table of Contents
* [Summary](#summary)
    * [Packages](#packages)
    * [Init](#init)
    * [Directory Structure](#directory-structure)
    * [How to Use](#how-to-use)
        * [Local](#local)
        * [Building the Docker Container](#building-the-docker-continer)
        * [Running the Docker Container](#running-the-docker-container)
* [Common Errors](#common-errors)
* [Glossary of Terms](#glossary-of-terms)

# Summary
This directory is for practicing GraphQL in isolation (no database, use the `users` variable in `/schema/schema.js`). Uses the `GraphiQL` interface for the front-end.

<p align="center">
<img src="images/graphql_practice_server_schema_database.drawio.png" width="400" margin-left="auto" margin-right="auto">
</p>

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
└── graphql_practice_no_database
    ├── README.md
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
First, `cd` into the directory this `README.md` is located in.

Start `express` server:
* `node server.js`

While the `express` server is running, go to `localhost:4000/graphql`.

If you make changes to `schema.js`, restart the `express` server.

### Building the Docker Container
First, `cd` into the directory this `README.md` is located in.

Run the following command:
* `docker build -t graphql_practice_no_database .`

### Running the Docker Container
Start the container:
* `docker run -p4000:4000 graphql_practice_no_database`

Then go to `localhost:4000/graphql` in your browser.