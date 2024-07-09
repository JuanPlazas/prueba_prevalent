import { getIngresosEgresosQuery, getIngresosEgresosConceptosQuery, createIngresosEgresosQuery } from "./queries"
import { useEffect, useState } from "react";
import { TablaIngresosEgresos } from "./components/TablaIngresosEgresos"
import NewIngresoEgresoPage from "./components/FormNewIngresoEgreso";
import { useRouter } from "next/navigation"
import { useToast } from '@/components/ui/use-toast'
import Loading from "@/components/ui/loading";
import { useSession } from "next-auth/react";
import { peticionGraphql } from "@/shared/fetchShare";

function IngresosEgresosPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { data: session } = useSession()
  const [ingresosEgresosData, setIngresosEgresosData] = useState([])
  const [ingresosEgresosConceptosData, setIngresosEgresosConceptosData] = useState([])
  const [isNewIngresoEgreso, setIsNewIngresoEgreso] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const ingresosEgresosHeaders = [
    "Concepto",
    "Monto",
    "Fecha",
    "Usuario",
  ]

  useEffect(() => {
    setIsLoading(true)
    if(session){
      peticion()
    }
    async function peticion() {
      const ingresosEgresos = await peticionGraphql(getIngresosEgresosQuery , session.user.authorization)
      const ingresosEgresosConceptos = await peticionGraphql(getIngresosEgresosConceptosQuery , session.user.authorization)
      setIngresosEgresosConceptosData(ingresosEgresosConceptos.data.getIngresosEgresosConceptos)
      loadIngresosEgresos(ingresosEgresos)
      setIsLoading(false)
    }
  }, [session])

  const loadIngresosEgresos = (ingresosEgresos) => {
    if (ingresosEgresos.data) {
      const { getIngresosEgresos } = ingresosEgresos.data
      const ingresosEgresosLoad = []

      getIngresosEgresos.map((ingresoEgreso) => {
        const dataLoad = {
          id: ingresoEgreso.id,
          monto: ingresoEgreso.monto,
          id_concepto: ingresoEgreso.concepto.id,
          concepto: ingresoEgreso.concepto.name,
          id_user: ingresoEgreso.user.id,
          user: ingresoEgreso.user.name,
          fecha: new Date(Number(ingresoEgreso.fecha)).toLocaleDateString("es-es")
        }

        ingresosEgresosLoad.push(dataLoad)
      })

      setIngresosEgresosData(ingresosEgresosLoad)
    }
  }

  const saveIngresoEgreso = async (dataForm) => {
    try {
      dataForm.fecha = new Date(dataForm.fecha).toISOString()
      dataForm.id_user = session.user.id
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({query: createIngresosEgresosQuery(dataForm)}),
      });

      const responseData = await response.json();

      if(responseData.errors && responseData.errors.length > 0) {
        toast({
          title: "Error",
          description: responseData.errors[0].message,
          variant: "destructive"
        })
      }

      if(responseData?.data?.createIngresosEgresos?.id) {
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
          <Loading/>
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

    </div>
  )
}

export default IngresosEgresosPage