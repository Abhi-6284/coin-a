const { buildSchema } = require('graphql');




// const schema = buildSchema(`
//   type Todo {
//     id: ID!
//     title: String!
//     completed: Boolean!
//   }

//   input TodoInput {
//     title: String!
//     completed: Boolean
//   }

//   type Query {
//     getTodos: [Todo]
//     getTodoById(id: ID!): Todo
//   }

//   type Mutation {
//     createTodo(input: TodoInput): Todo
//     updateTodoById(id: ID!, input: TodoInput): Todo
//     deleteTodoById(id: ID!): Todo
//   }
// `);


const schema = buildSchema(`
  scalar ID

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    role: String!
  }

  input UserInput {
    name: String!
    email: String
    password: String
    role: String
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