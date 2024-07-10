import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "@/components/ui/Sidebar";
import { ApolloProvider } from '@apollo/client';
import client from "@/lib/client"
import { SessionProvider } from "next-auth/react";
import Layout from "./layout";

export default function App({ Component, pageProps }: AppProps) {
  return <SessionProvider>
    <ApolloProvider client={client}>
      <Layout Component={Component} pageProps />
    </ApolloProvider>
  </SessionProvider>
    ;
}
