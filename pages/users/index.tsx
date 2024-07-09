import { useQuery } from "@apollo/client";
import { getUsersQuery, getUserQuery, updateUserQuery, getUserRolesrQuery } from "./queries"
import { useEffect, useState } from "react";
import { TablaUsers } from "./components/TablaUsers"
import UpdateUserPage from "./components/FormUpdateUser";
import { useRouter } from "next/navigation"
import { useToast } from '@/components/ui/use-toast'
import Loading from "@/components/ui/loading";
import { useSession } from "next-auth/react";
import NeedAdminComponent from "@/components/ui/needAdmin";
import { peticionGraphql } from "@/shared/fetchShare";

function UsersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [usersData, setusersData] = useState([])
  const [userRolesData, setUserRolesData] = useState([])
  const [isUpdateUser, setIsUpdateUser] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const usersHeaders = [
    "Nombre",
    "Email",
    "Telefono",
    "Rol",
    "Accion",
  ]
  const { data: session } = useSession()

  useEffect(() => {
    setIsLoading(true)
    if(session){
      peticion()
    }
    async function peticion() {
      const users = await peticionGraphql(getUsersQuery , session.user.authorization)
      const userRoles = await peticionGraphql(getUserRolesrQuery , session.user.authorization)
      loadUsers(users)
      setUserRolesData(userRoles.data.getUserRoles)
      setIsLoading(false)
    }
  }, [session])

  if(session?.user.id_rol != 1) { // si no es admin no puede ingresar
    return <NeedAdminComponent />
  }

  const handlerIsUpdateUser = async (idUser) => {
    try {
      setIsLoading(true)
      const response =  await peticionGraphql(getUserQuery(idUser) , session.user.authorization)

      if(response.errors && response.errors.length > 0) {
        setIsLoading(false)
        toast({
          title: "Error",
          description: response.errors[0].message,
          variant: "destructive"
        })
      }

      if(response?.data?.getUser?.id) {
        setCurrentUser(response.data.getUser)
        setIsUpdateUser(!isUpdateUser)
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Error en la ejecución de la consulta:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    }
  }

  const loadUsers = (users) => {
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
      setIsLoading(true)
      const response = await peticionGraphql(updateUserQuery(dataForm) , session.user.authorization)
      if(response.errors && response.errors.length > 0) {
        setIsLoading(false)
        toast({
          title: "Error",
          description: response.errors[0].message,
          variant: "destructive"
        })
      }

      if(response?.data?.updateUser?.id) {
        toast({
          title: "Exito",
          description: "Usuario actualizado con exito",
          className: "bg-green-600 text-white"
        })
        setIsLoading(false)
        router.refresh()
      }

    } catch (error) {
      setIsLoading(false)
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