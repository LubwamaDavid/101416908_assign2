// schema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String
    token: String
  }

  type Employee {
    id: ID!
    name: String!
    email: String!
    department: String!
    position: String!
    salary: Float!
    imageUrl: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getEmployees: [Employee]
    getEmployee(id: ID!): Employee
  }

  type Mutation {
    signup(email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload

    addEmployee(
      name: String!
      email: String!
      department: String!
      position: String!
      salary: Float!
      imageUrl: String
    ): Employee

    updateEmployee(
      id: ID!
      name: String
      email: String
      department: String
      position: String
      salary: Float
      imageUrl: String
    ): Employee

    deleteEmployee(id: ID!): String
  }
`;

module.exports = typeDefs;
