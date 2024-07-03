import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "@/components/ui/Sidebar";
import { ApolloProvider } from '@apollo/client';
import client from "@/lib/client"

export default function App({ Component, pageProps }: AppProps) {
  return <div className="flex flex-row items-center">
    <Sidebar />
    <ApolloProvider client={client}>
      <Component {...pageProps}/>
    </ApolloProvider>
  </div> 
  ;
}
