const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    type UserData {
        _id: ID!
        email: String!
        password: String!
        lastLogin: String!
    }

    type UserMethods {
        getUsers: [UserData!]
    }

    schema {
        query: UserMethods
    }

`);