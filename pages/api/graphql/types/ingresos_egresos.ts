export const IngresosEgresosTypeDefs = `
  type Query {
    getIngresosEgresos: [IngresoEgreso]!
  }

  type Query {
    createIngresosEgresos(input: IngresoEgresoCreateInput!): IngresoEgreso
  }

  type Query {
    getIngresoEgreso(input: IngresoEgresoIdInput!): IngresoEgreso
  }

  type Query {
    updateIngresoEgreso(input: IngresoEgresoCreateInput!): IngresoEgreso
  }

  type Query {
    deleteIngresoEgreso(input: IngresoEgresoIdInput!): IngresoEgreso
  }

  input IngresoEgresoIdInput {
    id: Int
  }

  input IngresoEgresoCreateInput {
    id: Int
    monto: Float
    id_user: Int
    id_concepto: Int
  }

  type IngresoEgreso {
    id: Int
    monto: Float
    id_user: Int
    user: User
    concepto: IngresosEgresosConcepto
    id_concepto: Int
  }
`