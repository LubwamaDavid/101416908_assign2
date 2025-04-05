const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    email: String!
    department: String!
    position: String!
    salary: Int!
    imageUrl: String
  }

  type Query {
    getEmployees: [Employee]
    getEmployee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(
      name: String!
      email: String!
      department: String!
      position: String!
      salary: Int!
      imageUrl: String
    ): Employee

    updateEmployee(
      id: ID!
      name: String
      email: String
      department: String
      position: String
      salary: Int
      imageUrl: String
    ): Employee

    deleteEmployee(id: ID!): String
  }
`;

module.exports = typeDefs;
