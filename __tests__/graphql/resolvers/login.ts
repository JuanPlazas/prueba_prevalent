import jwt from "jsonwebtoken"
import LoginResolvers from '@/pages/api/graphql/resolvers/login'
import { prismaMock } from '@/prisma/singleton'

const token = Math.random().toString(36).substring(7)
const tokenjwt = jwt.sign({
  token,
  id_user: 7
}, process.env.SECRET_KEY);
const login = {
  id: 1,
  token: tokenjwt,
  id_user: 7,
  createdAt: new Date(),
  updatedAt: new Date()
}

describe("Login Resolver", () => {
  test('should create new Login ', async () => {
    //@ts-ignore
    prismaMock.login.create.mockResolvedValue(login)
    const newLogin = await LoginResolvers.createLogin(null, { input: login })
    expect(newLogin).toEqual(login)
  })

  test('should get Login ', async () => {
    prismaMock.login.findUnique.mockResolvedValue(login)
    const loginFound = await LoginResolvers.getLoginByIdUser(null, { input: { id_user: login.id_user } })
    expect(loginFound).toEqual(login)
  })
})