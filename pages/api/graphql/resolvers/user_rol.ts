import db from "@/lib/db"

const getUserRoles = async () => {
  const userRoles = await db.userRol.findMany()
  return userRoles
}

export default {
  getUserRoles
}