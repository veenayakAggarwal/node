import { buildSchema } from 'graphql';

export const userSchema =  buildSchema(`

    input UserInput {
        email: String!
        password: String!
    }

    type User {
        _id: ID!
        email: String!
        password: String!
        lastLogin: String
    }

    type UserMethods {
        getUsers: [User!]
    }

    type UserMutation {
        createUser(userInput: UserInput) : User!
    }

    schema {
        query: UserMethods
        mutation: UserMutation
    }

`);