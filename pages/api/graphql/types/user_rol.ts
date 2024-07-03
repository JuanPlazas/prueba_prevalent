export const UserRolesTypeDefs = `
  type Query {
    getUserRoles: [UserRol]!
  }

  type UserRol {
    id: Int
    rol: String
  }
`