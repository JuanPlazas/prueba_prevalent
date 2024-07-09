export const getIngresosEgresosQuery = `
  query getIngresosEgresosQuery {
    getIngresosEgresos {
      id
      monto
      fecha
      concepto {
        id
        name
      }
      user {
        id
        name
      }
    } 
  }
`;

export const getIngresosEgresosConceptosQuery = `
  query getIngresosEgresosConceptosQuery{
    getIngresosEgresosConceptos {
      id
      name
    }
  }
`;

export const createIngresosEgresosQuery = (dataForm) => `
  query getIngresosEgresosQuery {
    createIngresosEgresos(input: {
      id_concepto: ${dataForm.concepto}
      monto: ${dataForm.monto}
      fecha: "${dataForm.fecha}"
      id_user: ${dataForm.id_user}
    }) {
      id
    }
  }
`;