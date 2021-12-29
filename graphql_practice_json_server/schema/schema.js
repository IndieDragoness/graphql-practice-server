// Schema file contains all of the knowledge for telling GraphQL
// exactly what your applications data looks like, including:
//   1. What properties each object has
//   2. Exactly how each object relates to each other

// From course page: https://www.udemy.com/course/graphql-with-react-course/learn/lecture/6523028#overview
// Import GraphQL:
const graphql = require('graphql');
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema // Helper, takes in root query and returns GraphQL schema instance
} = graphql;

// The order in which you define 'Types' in GraphQL can be significant, as is the case with CompanyType
// Treat associations between Types as just another field, for example see the company field in UserType below
const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString }
    }
});

// This instructs GraphQL what properties UserType should have
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: { // Every user will have an id, a firstName, and an age
        id: { type: GraphQLString},
        firstName: { type: GraphQLString},
        age: { type: GraphQLInt},
        company: { // Associate UserType and CompanyType
            type: CompanyType,
            resolve(parentValue, args) {

                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                    .then(res => res.data); // .then: Axios addition to format the return type in a way GraphQL expects
            }
        }
    }
});

// Allow GraphQL to jump and land on a specific node as a starting point
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            // Return type of root query: (User)
            type: UserType,
            // Arguments required for this root query (User ID):
            args: { id: { type: GraphQLString} },
            // Resolve makes the actual database call to get the data
            resolve(parentValue,
                    args) {
                // Connect GraphQL to the json-server; keep in mind that this is
                // an ES6 template string, use backticks `` instead of quotes ''
                // The id portion of args.id comes in when the query is made.
                // Note that you will have to make sure your return value is something
                // GraphQL expects; axios doesn't return the response in the necessary
                // format, so we use resp => resp.data to change it. 
                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(resp => resp.data);
            }
        }
    }
});

// module.exports makes this new GraphQL Schema available to other parts of the app
module.exports = new GraphQLSchema({
    query: RootQuery // Defined directly above
})