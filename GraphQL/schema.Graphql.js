const { buildSchema } = require('graphql');

const schema = buildSchema(`
  scalar ID

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String
    password: String
  }

  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
    getUserByPara(email: String!): User
  }

  type Mutation {
    createUser(input: UserInput): User
    updateUserById(id: ID!, input: UserInput): User!
    deleteUserById(id: ID!): User
  }
`);


module.exports = schema;