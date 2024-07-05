import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { gql } from 'graphql-tag';

/** importacion de nuestros typeDefs */
import {IngresosEgresosConceptosTypeDefs} from "./graphql/types/ingresos_egresos_conceptos"
import {UserRolesTypeDefs} from "./graphql/types/user_rol"
import {UsersTypeDefs} from "./graphql/types/user"
import {IngresosEgresosTypeDefs} from "./graphql/types/ingresos_egresos"
import {ReportesTypeDefs} from "./graphql/types/reportes"

/** importacion de nuestros resolvers */
import IngresosEgresosConceptosResolvers from "./graphql/resolvers/ingresos_egresos_conceptos"
import UserRolesResolvers from "./graphql/resolvers/user_rol"
import UsersResolvers from "./graphql/resolvers/user"
import IngresosEgresosResolvers from "./graphql/resolvers/ingresos_egresos"
import ReportesResolvers from "./graphql/resolvers/reportes"

const typeDefs = gql`
  ${IngresosEgresosConceptosTypeDefs}
  ${UserRolesTypeDefs}
  ${UsersTypeDefs}
  ${IngresosEgresosTypeDefs}
  ${ReportesTypeDefs}
`;

const resolvers = {
  Query: {
    ...IngresosEgresosConceptosResolvers,
    ...UserRolesResolvers,
    ...UsersResolvers,
    ...IngresosEgresosResolvers,
    ...ReportesResolvers,
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
});

export default startServerAndCreateNextHandler(server);
