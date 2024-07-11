import IngresosEgresosResolvers from '@/pages/api/graphql/resolvers/ingresos_egresos'
import { prismaMock } from '@/prisma/singleton'

describe("Ingresos Egresos Resolvers", () => {
  test('should create ingresosEgreso', async () => {
    const ingresoEgreso = {
      id: 1,
      monto: 10000,
      user: {
        id: 1,
        email: "test@test.com",
        name: "test",
        password: "12345",
        telefono: "123456789",
        rol: {
          id: 1,
          rol: "admin"
        },
        id_rol: 1,
        provider: "credentials",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      id_user: 1,
      concepto: {
        id: 1,
        name: "ingreso",
        description: "ingreso de capital",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      id_concepto: 1,
      fecha: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    //@ts-ignore
    prismaMock.ingresosEgresos.create.mockResolvedValue(ingresoEgreso)
    const ingresoEgresoFound = await IngresosEgresosResolvers.createIngresosEgresos(
      null,
      { input: ingresoEgreso }
    )
    expect(ingresoEgresoFound).toEqual(ingresoEgreso)
  })

  test('should get ingresosEgresos', async () => {
    const ingresoEgresos = [
      {
        id: 1,
        monto: 10000,
        user: {
          id: 1,
          rol: {
            id: 1,
            rol: "admin"
          },
        },
        concepto: {
          id: 1,
          name: "ingreso",
        },
        fecha: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        monto: 30000,
        user: {
          id: 1,
          rol: {
            id: 1,
            rol: "admin"
          },
        },
        concepto: {
          id: 2,
          name: "egreso",
        },
        fecha: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    //@ts-ignore
    prismaMock.ingresosEgresos.findMany.mockResolvedValue(ingresoEgresos)
    const ingresoEgresosFound = await IngresosEgresosResolvers.getIngresosEgresos()
    expect(ingresoEgresosFound).toEqual(ingresoEgresos)
  })

  test('should get ingresosEgreso', async () => {
    const ingresoEgreso = {
      id: 1,
      monto: 10000,
      user: {
        id: 1,
        rol: {
          id: 1,
          rol: "admin"
        },
      },
      concepto: {
        id: 1,
        name: "ingreso",
      },
      fecha: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    //@ts-ignore
    prismaMock.ingresosEgresos.findUnique.mockResolvedValue(ingresoEgreso)
    const ingresoEgresoFound = await IngresosEgresosResolvers.getIngresoEgreso(
      null,
      { input: { id: 1 } }
    )
    expect(ingresoEgresoFound).toEqual(ingresoEgreso)
  })

  test('should update ingresosEgreso', async () => {
    const ingresoEgreso = {
      id: 1,
      monto: 2550,
      user: {
        id: 1,
        rol: {
          id: 1,
          rol: "admin"
        },
      },
      concepto: {
        id: 1,
        name: "ingreso",
      },
      fecha: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    //@ts-ignore
    prismaMock.ingresosEgresos.update.mockResolvedValue(ingresoEgreso)
    const ingresoEgresoUpdated = await IngresosEgresosResolvers.updateIngresoEgreso(
      null,
      { input: ingresoEgreso }
    )
    expect(ingresoEgresoUpdated).toEqual(ingresoEgreso)
  })

  test('should delete ingresosEgreso', async () => {
    const ingresoEgreso = {
      id: 1,
      monto: 2550,
      user: {
        id: 1,
        rol: {
          id: 1,
          rol: "admin"
        },
      },
      concepto: {
        id: 1,
        name: "ingreso",
      },
      fecha: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    //@ts-ignore
    prismaMock.ingresosEgresos.delete.mockResolvedValue(ingresoEgreso)
    const ingresoEgresoDelted = await IngresosEgresosResolvers.deleteIngresoEgreso(
      null,
      { input: { id: ingresoEgreso.id } }
    )

    expect(ingresoEgresoDelted).toEqual(ingresoEgreso)
  })
})