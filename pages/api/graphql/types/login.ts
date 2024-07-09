export const LoginTypeDefs = `
  type Query {
    createLogin(input: LoginInput!): Login
  }

  type Query {
    getLoginByIdUser(input: LoginIdUserInput!): Login
  }

  input LoginIdUserInput {
    id_user: Int
  }

  input LoginInput {
    id_user: Int
    token: String
  }

  type Login {
    id: Int 
    user: User 
    id_user: Int 
    token: String
  }
`