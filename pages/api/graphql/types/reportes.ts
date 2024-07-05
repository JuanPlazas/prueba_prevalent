export const ReportesTypeDefs = `
  type Query {
    getReportesPorRangoFecha(input: ReportesInput!): [Reporte]
  }

  input ReportesInput {
    amount: Int
    unit: String
  }

  type Reporte {
    id: Int
    monto: Float
    fecha: String
    concepto: IngresosEgresosConcepto
    user: User
  }
`