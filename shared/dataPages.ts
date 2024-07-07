/** La finalidad de este file es reutilizar la informacion de las paginas para
 *  la navegacion, esta siendo usado en HomePage y el componente Sidebar */

/** info sacada de la tabla de parametrizacion UserRol */
const Admin = {id: 1, rol: "admin"}
const User = {id: 2, rol: "user"}

export const dataPages = [
  {
    title: "Ingresos y egresos",
    url: "/ingresos_egresos",
    description: "Sistema de gestion de ingresos y gastos",
    userRol: User
  },
  {
    title: "Usuarios",
    url: "/users",
    description: "Gestion de usuarios",
    userRol: Admin
  },
  {
    title: "Reportes",
    url: "/reportes",
    description: "Reportes",
    userRol: Admin
  },
]