import { getIngresosEgresosQuery, getIngresosEgresosConceptosQuery, createIngresosEgresosQuery } from "../../shared/queries/ingresosEgresos/queries"
import { useEffect, useState } from "react";
import TablaIngresosEgresos from "./components/TablaIngresosEgresos"
import NewIngresoEgresoPage from "./components/FormNewIngresoEgreso";
import { useRouter } from "next/navigation"
import { useToast } from '@/components/ui/use-toast'
import Loading from "@/components/ui/loading";
import { peticionGraphql } from "@/shared/fetchShare";
import { formatCash, formatValue } from "@/shared/formatValues";

function IngresosEgresosPage({Seccion}) {
  const router = useRouter()
  const { toast } = useToast()
  const [ingresosEgresosData, setIngresosEgresosData] = useState([])
  const [ingresosEgresosConceptosData, setIngresosEgresosConceptosData] = useState([])
  const [isNewIngresoEgreso, setIsNewIngresoEgreso] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [saldo, setSaldo] = useState("")

  const ingresosEgresosHeaders = [
    "Concepto",
    "Monto",
    "Fecha",
    "Usuario",
  ]

  useEffect(() => {
    setIsLoading(true)
    if (Seccion) {
      peticion()
    }
    async function peticion() {
      const ingresosEgresos = await peticionGraphql(getIngresosEgresosQuery, Seccion.user.authorization)
      const ingresosEgresosConceptos = await peticionGraphql(getIngresosEgresosConceptosQuery, Seccion.user.authorization)
      setIngresosEgresosConceptosData(ingresosEgresosConceptos?.data?.getIngresosEgresosConceptos)
      loadIngresosEgresos(ingresosEgresos)
      setIsLoading(false)
    }
  }, [Seccion])

  const loadIngresosEgresos = (ingresosEgresos) => {
    if (ingresosEgresos.data) {
      const { getIngresosEgresos } = ingresosEgresos.data
      const ingresosEgresosLoad = []
      let totalSaldo = 0

      getIngresosEgresos.map((ingresoEgreso) => {
        const dataLoad = {
          id: ingresoEgreso.id,
          monto: formatCash(ingresoEgreso.monto),
          id_concepto: ingresoEgreso.concepto.id,
          concepto: ingresoEgreso.concepto.name,
          id_user: ingresoEgreso.user.id,
          user: ingresoEgreso.user.name,
          fecha: new Date(Number(ingresoEgreso.fecha)).toLocaleDateString("es-es")
        }

        if (ingresoEgreso.concepto.id == 1) { //id de ingreso de la tabla de parametrizacion ingresosEgresosConceptos
          totalSaldo = totalSaldo + ingresoEgreso.monto
        } else if (ingresoEgreso.concepto.id == 2) { //id de egreso de la tabla de parametrizacion ingresosEgresosConceptos
          totalSaldo = totalSaldo - ingresoEgreso.monto
        }

        ingresosEgresosLoad.push(dataLoad)
      })

      setSaldo(formatCash(totalSaldo))
      setIngresosEgresosData(ingresosEgresosLoad.reverse())
    }
  }

  const saveIngresoEgreso = async (dataForm) => {
    try {
      dataForm.fecha = new Date(dataForm.fecha).toISOString()
      dataForm.id_user = Seccion.user.id
      const response = await peticionGraphql(createIngresosEgresosQuery(dataForm), Seccion.user.authorization)
      if (response.errors && response.errors.length > 0) {
        toast({
          title: "Error",
          description: response.errors[0].message,
          variant: "destructive"
        })
      }

      if (response?.data?.createIngresosEgresos?.id) {
        toast({
          title: "Exito",
          description: "IngresoEgreso creado con exito",
          className: "bg-green-600 text-white"
        })
        router.refresh()
      }

    } catch (error) {
      console.error('Error en la ejecución de la consulta:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    }
  }

  return (
    <div className="w-full flex flex-col h-[calc(100vh-7rem)]">
      {
        isLoading && (
          <Loading />
        )
      }
      <div className="my-10 flex flex-row justify-between items-center">
        <p className="font-bold text-xl border-b-2 border-slate-500 text-slate-500">
          Ingresos y egresos
        </p>
        <button
          className='bg-slate-500 py-1 px-3 rounded-lg my-1 text-white hover:bg-slate-300'
          onClick={() => setIsNewIngresoEgreso(!isNewIngresoEgreso)}
        >
          {isNewIngresoEgreso ? "Cancelar" : "Nuevo"}
        </button>
      </div>
      <div className="w-full flex flex-col h-[calc(100vh-7rem)] bg-gray-500 overflow-auto">
        {
          isNewIngresoEgreso ?
            <NewIngresoEgresoPage
              ingresosEgresosConceptos={ingresosEgresosConceptosData}
              saveIngresoEgreso={saveIngresoEgreso}
            />
            :
            <TablaIngresosEgresos
              ingresosEgresosData={ingresosEgresosData}
              ingresosEgresosHeaders={ingresosEgresosHeaders}
            />
        }
      </div>
      <div className="w-full flex justify-end">
        <p className="bg-gray-500 text-white rounded-md p-2 mt-2">Total: {saldo}</p>
      </div>
    </div>
  )
}

export default IngresosEgresosPage