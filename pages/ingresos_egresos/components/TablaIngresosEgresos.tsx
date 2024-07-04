import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"

export function TablaIngresosEgresos({ingresosEgresosHeaders, ingresosEgresosData}) {
  return (
    <Table>
    <TableHeader>
      <TableRow>
        {
          ingresosEgresosHeaders.map((header) => (
            <TableHead className="text-white bg-gray-700" key={`header_${header}`}>{header}</TableHead>
          ))
        }
      </TableRow>
    </TableHeader>
    <TableBody>
        {
          ingresosEgresosData.map((data) => (
            <TableRow key={`row_${data.id}`}>
            <TableHead className="text-white">{data.concepto}</TableHead>
            <TableHead className="text-white">{data.monto}</TableHead>
            <TableHead className="text-white">Fecha</TableHead>
            <TableHead className="text-white">{data.user}</TableHead>
            </TableRow>
          ))
        }
    </TableBody>
  </Table>
  )
}
