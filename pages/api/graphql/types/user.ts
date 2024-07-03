export const UsersTypeDefs = `
  type Query {
    getUsers: [User]!
  }

  type Query {
    createUser(input: UserCreateInput!): User
  }

  type Query {
    getUser(input: UserIdInput!): User
  }

  type Query {
    updateUser(input: UserCreateInput!): User
  }

  type Query {
    deleteUser(input: UserIdInput!): User
  }

  input UserIdInput {
    id: Int
  }

  input UserCreateInput {
    id: Int
    email: String
    name: String
    password: String
    telefono: String
    id_rol: Int
  }

  type User {
    id: Int
    email: String
    name: String
    password: String
    telefono: String
    id_rol: Int
    rol: UserRol
  }
`