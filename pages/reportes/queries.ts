import { formatValue } from "@/shared/formatValues";
import { gql } from "@apollo/client";

export const getReportesPorRangoFechaQuery = ({amount, unit}) => gql`
  query getReportesPorRangoFechaQuery {
    getReportesPorRangoFecha(input: {
    amount: ${amount},
    unit: "${unit}"
  }) {
    id
    fecha
    monto
    concepto {
      id
      name
    } 
    user {
      id
      email
      name
      telefono
      rol {
        id
        rol
      }
    }
    }
  }
`;
