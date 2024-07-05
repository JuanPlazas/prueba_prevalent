import { formatValue } from "@/shared/formatValues";
import { gql } from "@apollo/client";

export const getUsersQuery = gql`
  query getUsersQuery {
    getUsers {
      id
      email
      telefono
      name
      rol {
        id
        rol
      }
    }
  }
`;

export const getUserRolesrQuery = gql`
  query getUserRolesrQuery {
    getUserRoles {
      id
      rol
    }
  }
`;

export const getUserQuery = (idUser) => `
  query getUserQuery {
    getUser(input: {id: ${idUser}}) {
      id
      email
      telefono
      name
      rol {
        id
        rol
      }
    }
  }
`;

export const updateUserQuery = (dataForm) => `
  query updateUserQuery {
    updateUser(input: {
      ${Object.entries(dataForm).map(([key, value]) => `${key}: ${formatValue(value)}`).join(',\n')}
    }) {
      id
      email
      telefono
      name
      rol {
        id
        rol
      }
    }
  }
`;