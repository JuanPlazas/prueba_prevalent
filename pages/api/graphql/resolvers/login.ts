import db from "@/lib/db"

const createLogin = async (_: any, {input}: any) => {
  const newLogin = await db.login.create({
    data: input,
    include: {
      user: true
    }
  })
  return newLogin
}

const getLoginByIdUser = async (_: any, {input}: any) => {
  const user = await db.login.findUnique({
    where: {
      id_user: input.id_user
    },
    include: {
      user: true
    }
  })

  return user
}

export default {
  createLogin,
  getLoginByIdUser,
}