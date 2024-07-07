import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Auth0Provider from "next-auth/providers/auth0";
import db from '@/lib/db'

const finUserByEmail = async (email: string) => {
  const userFound = await db.user.findUnique({
    where: {
      email: email
    }
  })

  return userFound
}


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const userFound = await finUserByEmail(credentials.email)

        if (!userFound) throw new Error('Usuario no registrado')

        if (credentials.password != userFound.password) throw new Error('Contraseña incorrecta')
        const { password: _, ...user } = userFound;
        return user
      },
    }
    ),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
    })
  ],
  callbacks: {
    async signIn(params) {
      let userDb = null

      if (params.account.provider == 'auth0') {
        userDb = await finUserByEmail(params.user.email)
        if (!userDb) {
          userDb = await db.user.create({
            data: {
              email: params.user.email,
              name: params.user.name,
              password: "to-do",
              telefono: params.user.telefono,
              id_rol: 2, // se crea como un User
              provider: "ath0"
            },
            include: {
              rol: true
            }
          })
        }
        
        params.user.id = userDb.id
        params.user.name = userDb.name
        params.user.id_rol = userDb.id_rol
      }

      return true; // Devuelve true para permitir que el proceso de inicio de sesión continúe
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});