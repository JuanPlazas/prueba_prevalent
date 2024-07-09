import { getReportesPorRangoFechaQuery } from "./queries"
import React, { useEffect, useState } from 'react'
import { Chart } from 'chart.js/auto';
import Loading from '@/components/ui/loading';
import * as XLSX from 'xlsx';
import { useSession } from 'next-auth/react';
import NeedAdminComponent from '@/components/ui/needAdmin';
import { peticionGraphql } from '@/shared/fetchShare';

function ReportesPage() {
  const rangoFechas = [
    { amout: null, unit: "", title: "Hoy" },
    { amout: 1, unit: "week", title: "Ultima semana" },
    { amout: 1, unit: "month", title: "Ultima mes" },
    { amout: 1, unit: "year", title: "Ultima año" },
  ]
  const [canvas, setCanvas] = useState(null)
  const [saldo, setSaldo] = useState("")
  const [dataCSV, setDataCSV] = useState([])
  const [rangoFechaSelect, setRangoFechaSelect] = useState(rangoFechas[0].unit)
  const [reportesData, setReportesData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    if(session){
      getResportesData()
    }
  }, [session, rangoFechaSelect])

  useEffect(() => {
    if(reportesData) {
      buildGraphic(reportesData)
      loadDate(reportesData)
    }
  }, [reportesData])

  if(session?.user.id_rol != 1) { // si no es admin no puede ingresar
    return <NeedAdminComponent />
  }

  const getResportesData = async () => {
    setIsLoading(true)
    const reportes = await peticionGraphql(getReportesPorRangoFechaQuery({ amount: 1, unit: rangoFechaSelect }) , session.user.authorization)
    setReportesData(reportes?.data?.getReportesPorRangoFecha)
    setIsLoading(false)
  }

  const descargarExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(dataCSV);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `reporte.csv`);
  }

  const loadDate = async (reportesData) => {
    let totalSaldo = 0
    const dataLoad = []

    reportesData.map((reporte) => {
      if (reporte.concepto.id == 1) { //id de ingreso de la tabla de parametrizacion ingresosEgresosConceptos
        totalSaldo = totalSaldo + reporte.monto
      } else if (reporte.concepto.id == 2) { //id de egreso de la tabla de parametrizacion ingresosEgresosConceptos
        totalSaldo = totalSaldo - reporte.monto
      }

      dataLoad.push({
        concepto: reporte.concepto.name,
        monto: new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP'
        }).format(reporte.monto),
        fecha: new Date(Number(reporte.fecha)).toLocaleDateString("es-Es"),
        user: reporte.user.name,
        user_email: reporte.user.email
      })
    })

    setDataCSV(dataLoad);
    setSaldo(new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(totalSaldo),)
  }

  const buildGraphic = async (reportesData) => {
    const ctx: any = document.getElementById('reportesGrafica');
    const labels = []
    const values = []
    const backgroundColor = []

    reportesData.map((reporte) => {
      labels.push(new Date(Number(reporte.fecha)).toLocaleDateString("es-Es"))
      if (reporte.concepto.id == 1) { //id de ingreso de la tabla de parametrizacion ingresosEgresosConceptos
        values.push(reporte.monto)
        backgroundColor.push("rgba(57, 166, 58, 0.5)")
      } else if (reporte.concepto.id == 2) { //id de egreso de la tabla de parametrizacion ingresosEgresosConceptos
        values.push(-reporte.monto)
        backgroundColor.push("rgba(186, 0, 0, 0.5)")
      }
    })

    if (canvas) {
      const existingChart = Chart.getChart(canvas);
      if (existingChart) {
        existingChart.destroy();
      }
    }

    setCanvas(new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Movimientos',
            data: values,
            backgroundColor: backgroundColor,
          },
        ],
      },

      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    }));
  }

  return (
    <div className="w-full flex flex-col h-[calc(100vh-7rem)]">
      {
        isLoading && (
          <Loading />
        )
      }
      <div className="flex flex-row justify-between items-center">
        <p className="font-bold text-xl border-b-2 border-slate-500 text-slate-500">
          Reportes
        </p>

        <div className='flex flex-row justify-center items-center'>
          <p className="font-bold text-xl border-b-2 border-slate-500 text-slate-500 mx-5 text-nowrap">
            Saldo: {saldo}
          </p>

          <select
            className='rounded my-1 border py-2 px-5 mx-5'
            defaultValue={rangoFechaSelect}
            onChange={(e) => setRangoFechaSelect(e.target.value)}
          >
            {
              rangoFechas.map((rango) => (
                <option key={`rango_${rango.unit}`} value={rango.unit}>{rango.title}</option>
              ))
            }
          </select>

          <button
            type="submit" 
            className='w-full bg-green-500 text-white rounded-lg py-2 px-5 mx-5'
            onClick={descargarExcel}
          >
            Descargar CSV
          </button>
        </div>


      </div>
      <div className="w-full h-[calc(100vh-10rem)]">
        <canvas
          id="reportesGrafica"
        ></canvas>
      </div>
    </div>
  )
}

export default ReportesPage