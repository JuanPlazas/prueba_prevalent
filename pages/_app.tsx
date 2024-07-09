import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "@/components/ui/Sidebar";
import { ApolloProvider } from '@apollo/client';
import client from "@/lib/client"
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return <SessionProvider>
    <div className="flex flex-row items-center">
      <Sidebar />
      <div className="flex flex-col justify-center w-full px-10 items-center">
        <h1 className="text-4xl font-bold">Sistema de gestion de Ingresos y Gastos</h1>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
        <Toaster />
      </div>
    </div>
  </SessionProvider>
    ;
}
