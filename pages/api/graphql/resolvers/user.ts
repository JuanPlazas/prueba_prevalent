import db from "@/lib/db"

const getUsers = async () => {
  const users = await db.user.findMany({
    include: {
      rol: true
    }
  })
  return users
}

const createUser = async (_: any, {input}: any) => {
  const newUser = await db.user.create({
    data: input,
    include: {
      rol: true
    }
  })
  return newUser
}

const getUser = async (_: any, {input}: any) => {
  const user = await db.user.findUnique({
    where: {
      id: input.id
    },
    include: {
      rol: true
    }
  })

  return user
}

const updateUser = async (_: any, {input}: any) => {
  const updatedUser = await db.user.update({
    where: {
      id: input.id
    },
    data: input,
    include: {
      rol: true
    }
  })
  return updatedUser
}

const deleteUser = async (_: any, {input}: any) => {
  const deletedUser = await db.user.delete({
    where: {
      id: input.id
    },
    include: {
      rol: true
    }
  })

  return deletedUser
}

export default {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
}