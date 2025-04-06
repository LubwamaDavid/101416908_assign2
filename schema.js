const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
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

  input EmployeeInput {
    name: String!
    email: String!
    department: String!
    position: String!
    salary: Float!
    imageUrl: String
  }

  type Query {
    getEmployees: [Employee!]!
    getEmployee(id: ID!): Employee
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): AuthPayload!
    login(username: String!, password: String!): AuthPayload!
    addEmployee(input: EmployeeInput!): Employee!
    updateEmployee(id: ID!, input: EmployeeInput!): Employee!
    deleteEmployee(id: ID!): String!
  }
`;

module.exports = typeDefs;
