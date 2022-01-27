import { buildSchema } from 'graphql';

export const userSchema =  buildSchema(`

    input UserInput {
        email: String!
        password: String!
    }

    input ValidateInputType {
        token: String! 
        userId: String!
    }
    
    type User {
        _id: ID!
        email: String!
        password: String!
        lastLogin: String
    }

    type ValidateType {
        isValid: Boolean!        
    }

    type AuthData {
        userId: ID!
        token: String!
    }

    type UserMethods {
        getUsers: [User!]
    }

    type UserMutation {
        createUser(userInput: UserInput) : User!
        login(userInput: UserInput): AuthData!
        validateToken(userInput: ValidateInputType): ValidateType!
    }

    schema {
        query: UserMethods
        mutation: UserMutation
    }

`);