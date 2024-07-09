import db from "@/lib/db"
import moment from "moment"

const getReportesPorRangoFecha = async (_: any, { input }: any) => {
  const today = moment().set({ hour: 23, minute: 59, second: 59 });
  let limit = today.clone()
  if (input.unit) {
    limit = limit.subtract(input.amount, input.unit).set({ hour: 0, minute: 0, second: 0 });
  } else {
    limit = limit.set({ hour: 0, minute: 0, second: 0 });
  }

  const reportes = await db.ingresosEgresos.findMany({
    where: {
      fecha: {
        gte: limit.toISOString(),
        lte: today.toISOString()
      }
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

  return reportes
}

export default {
  getReportesPorRangoFecha
}