const { gql } = require("apollo-server");

const typeDefs = gql`

    type Student{
        id: ID!
        name: String!
        age: Int!
        major: String!
        friends: [Student]
    }

    type Query {
        students: [Student!]!
        student(name: String): Student!
    }

    input CreateStudentInput {
        name: ID!
        age: Int
        major: String!
    }

    input UpdateNameInput {
        id: ID!
        newName: String!
    }

    type Mutation {
        createStudent(input: CreateStudentInput!): Student
        updateName(input: UpdateNameInput!): Student
        deleteStudent(id: ID!): Student
    }


`;

module.exports = { typeDefs }