import db from "@/lib/db"

const getIngresosEgresosConceptos = async () => {
  const ingresosEgresosConpectos = await db.ingresosEgresosConcepto.findMany()
  return ingresosEgresosConpectos
}

export default {
  getIngresosEgresosConceptos
}