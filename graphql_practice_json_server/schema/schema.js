// Schema file contains all of the knowledge for telling GraphQL
// exactly what your applications data looks like, including:
//   1. What properties each object has
//   2. Exactly how each object relates to each other

// From course page: https://www.udemy.com/course/graphql-with-react-course/learn/lecture/6523028#overview
// Import GraphQL:
const graphql = require('graphql');
const _ = require ('lodash'); // Helper for collections of data
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema // Helper, takes in root query and returns GraphQL schema instance
} = graphql;

// WARNING: In place of an actual database, the following can be used for dev
const users = [
    { id: '23', firstName: 'Bill', age: 20 },
    { id: '47', firstName: 'Samantha', age: 21}
];

// This instructs GraphQL what properties UserType should have
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: { // Every user will have an id, a firstName, and an age
        id: { type: GraphQLString},
        firstName: { type: GraphQLString},
        age: { type: GraphQLInt}
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
                // Replace this with your specific data implementation:
                return _.find(users, { id: args.id });
            }
        }
    }
});

// module.exports makes this new GraphQL Schema available to other parts of the app
module.exports = new GraphQLSchema({
    query: RootQuery // Defined directly above
})