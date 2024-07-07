import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: int
      email: string
      name: string
      telefono: string
      id_rol: int
    };
  }
}

declare module "next-auth" {
  interface User {
      id: int
      email: string
      name: string
      telefono: string
      id_rol: int
    };
}