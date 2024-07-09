import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"
import { Pencil2Icon } from '@radix-ui/react-icons'

export function TablaUsers({ usersHeaders, usersData, setIsUpdateUser }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {
            usersHeaders.map((header) => (
              <TableHead className="text-white bg-gray-700" key={`header_${header}`}>{header}</TableHead>
            ))
          }
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          usersData.map((data) => (
            <TableRow key={`row_${data.id}`}>
              <TableHead className="text-white">{data.name}</TableHead>
              <TableHead className="text-white">{data.email}</TableHead>
              <TableHead className="text-white">
                {data.telefono ? data.telefono : "No registra"}
              </TableHead>
              <TableHead className="text-white">{data.rol}</TableHead>
              <TableHead className="text-white flex justify-center items-center">
                <Pencil2Icon onClick={() => setIsUpdateUser(data.id)} />
              </TableHead>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}
