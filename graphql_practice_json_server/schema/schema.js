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
    GraphQLSchema, // Helper, takes in root query and returns GraphQL schema instance
    GraphQLList,
    GraphQLNonNull // Asserts that a value must not be empty
} = graphql;

// The order in which you define 'Types' in GraphQL can be significant, as is the case with CompanyType
// Treat associations between Types as just another field, for example see the company field in UserType below
const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType), // Since we're getting a 'List' of users, we wrap UserType with a new list type (don't forget to define GraphQLList above)
            resolve(parentValue, args) { // parentValue is the instance of the company that we are currently working with
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`) // parentValue.id = company id
                    .then(res => res.data);
            }
        }
    })
});

// This instructs GraphQL what properties UserType should have
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({ // Every user will have an id, a firstName, and an age
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
    })
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
        },
        company: { // Working with a root node of type company instead of user
            type: CompanyType, // The type of node being accessed
            args: { id: { type: GraphQLString } }, // When accessing a company, expect an id of type string
            resolve(parentValue,
                    args) {
                        return axios.get(`http://localhost:3000/companies/${args.id}`) // Template string with backtics ``, not quotes!
                            .then(resp => resp.data); // Compatibility between axios & GraphQL; only return data, not entire response object
                    }
        }
    }
});

// Mutations are used to modify objects
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
                    .then(res => res.data); // Compatibility between axios & GraphQL; only return data, not entire response object
            }
        },

        deleteUser: {
            type: UserType, // Refers to the type of data that we are eventually going to return from resolve(), except in mutations it's not ALWAYS the same
            args: { id: { type: new GraphQLNonNull(GraphQLString)} },
            resolve(parentValue, { id }){
                return axios.delete(`http://localhost:3000/users/${id}`, { })
                    .then(res => res.data); // Compatibility between axios & GraphQL; only return data, not entire response object
            }
        },

        editUser: {
            type: UserType, // Refers to the type of data that we are eventually going to return from resolve(), except in mutations it's not ALWAYS the same
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                firstName: { type: GraphQLString },
                age: { type: GraphQLInt },
                companyId: { type: GraphQLString }
            },
            resolve(parentValue, args){
                return axios.patch(`http://localhost:3000/users/${args.id}`, args)
                    .then(res => res.data); // Compatibility between axios & GraphQL; only return data, not entire response object
            }
        }
    }
});

// module.exports makes this new GraphQL Schema available to other parts of the app
module.exports = new GraphQLSchema({
    query: RootQuery, // Defined directly above
    mutation // Defined directly above
})