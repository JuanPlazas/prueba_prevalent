import IngresosEgresosConceptosResolvers from '@/pages/api/graphql/resolvers/ingresos_egresos_conceptos'
import { prismaMock } from '@/prisma/singleton'

describe("Ingresos Egresos Conceptos Resolvers", () => {
  test('should get ingresosEgresosConceptos ', async () => {
    const conceptos = [
      {
        id: 1,
        name: "ingreso",
        description: "ingreso de capital",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1,
        name: "egreso",
        description: "gasto de capital",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]

    //@ts-ignore
    prismaMock.ingresosEgresosConcepto.findMany.mockResolvedValue(conceptos)
    const conceptosFound = await IngresosEgresosConceptosResolvers.getIngresosEgresosConceptos()
    expect(conceptosFound).toEqual(conceptos)
  })
})