import { ApolloServer, HeaderMap } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { gql } from 'graphql-tag';
import jwt from "jsonwebtoken"
import { GraphQLError } from 'graphql';
import db from '@/lib/db';

/** importacion de nuestros typeDefs */
import {IngresosEgresosConceptosTypeDefs} from "./graphql/types/ingresos_egresos_conceptos"
import {UserRolesTypeDefs} from "./graphql/types/user_rol"
import {UsersTypeDefs} from "./graphql/types/user"
import {IngresosEgresosTypeDefs} from "./graphql/types/ingresos_egresos"
import {ReportesTypeDefs} from "./graphql/types/reportes"
import {LoginTypeDefs} from "./graphql/types/login"

/** importacion de nuestros resolvers */
import IngresosEgresosConceptosResolvers from "./graphql/resolvers/ingresos_egresos_conceptos"
import UserRolesResolvers from "./graphql/resolvers/user_rol"
import UsersResolvers from "./graphql/resolvers/user"
import IngresosEgresosResolvers from "./graphql/resolvers/ingresos_egresos"
import ReportesResolvers from "./graphql/resolvers/reportes"
import LoginResolvers from "./graphql/resolvers/login"

const typeDefs = gql`
  ${IngresosEgresosConceptosTypeDefs}
  ${UserRolesTypeDefs}
  ${UsersTypeDefs}
  ${IngresosEgresosTypeDefs}
  ${ReportesTypeDefs}
  ${LoginTypeDefs}
`;

const resolvers = {
  Query: {
    ...IngresosEgresosConceptosResolvers,
    ...UserRolesResolvers,
    ...UsersResolvers,
    ...IngresosEgresosResolvers,
    ...ReportesResolvers,
    ...LoginResolvers,
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });

async function requestMiddleware(req, res, next) {
  const headers : HeaderMap = req?.http.headers
  const authorization = headers.get("authorization");
  let errors = []

  if(!authorization) {
    errors.push("Falta header authorization")
  }

  try {
  const {id_user}: any = jwt.verify(authorization, process.env.SECRET_KEY)

  const loginFound = await db.login.findUnique({
    where: {
      id_user
    },
  })

  if(!loginFound) {
    errors.push("Error en la session")
  }

  if(authorization != loginFound.token) {
    errors.push("Error, no authorizado")
  }
  } catch(e) {
    errors.push(e.message)
  }
  if(errors.length > 0) {
    return errors.toString()
  }
}

const server = new ApolloServer({
  schema,
  plugins: [
    {
      async requestDidStart(requestContext) {
            const response = await requestMiddleware(requestContext.request, requestContext.response, () => {});
            if(response) {
              throw new Error(response);
            }
          },
    },
  ],
});
export default startServerAndCreateNextHandler(server);
