import Sidebar from "@/components/ui/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useSession } from "next-auth/react";
import Login from "@/pages/login";

export default function Layout({ Component, pageProps }) {
  const { data: session } = useSession();

  console.log("session", session)

  return (
    <div className="flex flex-row items-center">
      <Sidebar Seccion={session} />
      <div className="flex flex-col justify-center w-full px-10 items-center">
        <h1 className="text-4xl font-bold">
          Sistema de gestion de Ingresos y Gastos
        </h1>
        {
          session ?
          <Component {...pageProps} Seccion={session} />
          :
          <Login Seccion={null} />
        }
        <Toaster />
      </div>
    </div>
  );
}