export const IngresosEgresosConceptosTypeDefs = `
  type Query {
    getIngresosEgresosConceptos: [IngresosEgresosConcepto]!
  }

  type IngresosEgresosConcepto {
    id: Int
    name: String
    description: String
  }
`