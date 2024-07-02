import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "@/components/ui/Sidebar";

export default function App({ Component, pageProps }: AppProps) {
  return <div className="flex flex-row items-center">
    <Sidebar />
    <Component {...pageProps}/>
  </div> 
  ;
}
