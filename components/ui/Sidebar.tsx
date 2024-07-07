import Link from 'next/link'
import { dataPages } from "@/shared/dataPages"
import { useSession } from 'next-auth/react'
import { signOut } from "next-auth/react";

function Sidebar() {
  const { data: session } = useSession()
  return (
    session && (
      <div className='w-1/6 h-screen bg-slate-600 p-10 flex justify-center items-center text-white'>
        <ul>
          <Link href="/">
            <li
              className='bg-white hover:bg-slate-400 flex justify-center items-center rounded-md my-8 p-5 text-black'
            >
              Logo
            </li>
          </Link>
          {
            dataPages.map((data, index) => (
              (session?.user.id_rol == 1 ||
              session?.user.id_rol == data.userRol.id) && (  // filtra para el resto de los user
              <a href={data.url} key={`li_${index}`}>
                <li
                  className='bg-slate-800 hover:bg-slate-400 flex justify-center items-center rounded-md my-8 p-5'
                >
                  {data.title}
                </li>
              </a>
              )
            ))
          }
          <li
              className='bg-red-500 hover:bg-red-300 flex justify-center items-center rounded-md my-8 p-5 text-white'
              onClick={() => signOut()}
          >
            Logout
          </li>
        </ul>
      </div>
    )
  )
}

export default Sidebar