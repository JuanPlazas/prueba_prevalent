export const getReportesPorRangoFechaQuery = ({amount, unit}) => `
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
