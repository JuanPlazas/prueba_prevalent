import { useQuery } from "@apollo/client";
import { getUsersQuery, getUserQuery, updateUserQuery, getUserRolesrQuery } from "./queries"
import { useEffect, useState } from "react";
import { TablaUsers } from "./components/TablaUsers"
import UpdateUserPage from "./components/FormUpdateUser";
import { useRouter } from "next/navigation"
import { useToast } from '@/components/ui/use-toast'
import Loading from "@/components/ui/loading";

function UsersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const users = useQuery(getUsersQuery);
  const userRoles = useQuery(getUserRolesrQuery);
  const [usersData, setusersData] = useState([])
  const [userRolesData, setUserRolesData] = useState([])
  const [isUpdateUser, setIsUpdateUser] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const usersHeaders = [
    "Nombre",
    "Email",
    "Telefono",
    "Rol",
    "Accion",
  ]

  useEffect(() => {
      loadUsers()
  }, [users.data])

  useEffect(() => {
    if(userRoles.data){
      setUserRolesData(userRoles.data.getUserRoles)
    }
  }, [userRoles.data])

  const handlerIsUpdateUser = async (idUser) => {
    try {
      setLoading(true)
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({query: getUserQuery(idUser)}),
      });

      const responseData = await response.json();

      if(responseData.errors && responseData.errors.length > 0) {
        setLoading(false)
        toast({
          title: "Error",
          description: responseData.errors[0].message,
          variant: "destructive"
        })
      }

      if(responseData?.data?.getUser?.id) {
        setCurrentUser(responseData.data.getUser)
        setIsUpdateUser(!isUpdateUser)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.error('Error en la ejecución de la consulta:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    }
  }

  const loadUsers = () => {
    if (users.data) {
      const { getUsers } = users.data
      const usersLoad = []

      getUsers.map((user) => {
        const dataLoad = {
          id: user.id,
          name: user.name,
          email: user.email,
          telefono: user.telefono,
          rol_id: user.rol.id,
          rol: user.rol.rol,
        }

        usersLoad.push(dataLoad)
      })

      setusersData(usersLoad)
    }
  }

  const updateUser = async (dataForm) => {
    try {
      setLoading(true)
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({query: updateUserQuery(dataForm)}),
      });

      const responseData = await response.json();

      if(responseData.errors && responseData.errors.length > 0) {
        setLoading(false)
        toast({
          title: "Error",
          description: responseData.errors[0].message,
          variant: "destructive"
        })
      }

      if(responseData?.data?.updateUser?.id) {
        toast({
          title: "Exito",
          description: "Usuario actualizado con exito",
          className: "bg-green-600 text-white"
        })
        setLoading(false)
        router.refresh()
      }

    } catch (error) {
      setLoading(false)
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
        (users.loading || userRoles.loading || loading) && (
          <Loading/>
        )
      }
      <div className="my-10 flex flex-row justify-between items-center">
        <p className="font-bold text-xl border-b-2 border-slate-500 text-slate-500">
          Usuarios
        </p>
        {
          isUpdateUser && (
            <button
              className='bg-slate-500 py-1 px-3 rounded-lg my-1 text-white hover:bg-slate-300'
              onClick={() => setIsUpdateUser(!isUpdateUser)}
            >
              Cancelar
            </button>
          )
        }
      </div>
      <div className="w-full flex flex-col h-[calc(100vh-7rem)] bg-gray-500 overflow-auto">
        {
          isUpdateUser ?
            <UpdateUserPage 
              roles={userRolesData}
              updateUser={updateUser}
              currentUser={currentUser}
            />
            :
            <TablaUsers
              usersData={usersData}
              usersHeaders={usersHeaders}
              setIsUpdateUser={handlerIsUpdateUser}
            />
        }
      </div>

    </div>
  )
}

export default UsersPage