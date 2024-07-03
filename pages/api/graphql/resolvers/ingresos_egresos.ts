import db from "@/lib/db"

const getIngresosEgresos = async () => {
  const ingresosEgresos = await db.ingresosEgresos.findMany({
    include: {
      concepto: true,
      user: {
        include: {
          rol: true
        }
      }
    }
  })

  return ingresosEgresos
}

const createIngresosEgresos = async (_: any, {input}: any) => {
  const newIngresosEgresos = await db.ingresosEgresos.create({
    data: input,
    include: {
      concepto: true,
      user: {
        include: {
          rol: true
        }
      }
    }
  })
  return newIngresosEgresos
}

const getIngresoEgreso = async (_: any, {input}: any) => {
  const ingresoEgreso = await db.ingresosEgresos.findUnique({
    where: {
      id: input.id
    },
    include: {
      concepto: true,
      user: {
        include: {
          rol: true
        }
      }
    }
  })

  return ingresoEgreso
}

const updateIngresoEgreso = async (_: any, {input}: any) => {
  const updatedIngresoEgreso = await db.ingresosEgresos.update({
    where: {
      id: input.id
    },
    data: input,
    include: {
      concepto: true,
      user: {
        include: {
          rol: true
        }
      }
    }
  })
  return updatedIngresoEgreso
}

const deleteIngresoEgreso = async (_: any, {input}: any) => {
  const deletedIngresoEgreso = await db.ingresosEgresos.delete({
    where: {
      id: input.id
    },
    include: {
      concepto: true,
      user: {
        include: {
          rol: true
        }
      }
    }
  })

  return deletedIngresoEgreso
}

export default {
  getIngresosEgresos,
  createIngresosEgresos,
  getIngresoEgreso,
  updateIngresoEgreso,
  deleteIngresoEgreso,
}