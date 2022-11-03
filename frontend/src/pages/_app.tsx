import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css';

import { QueryClient, QueryClientProvider } from "react-query";
import {ReactQueryDevtools} from "react-query/devtools"

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {

  const queryClient = new QueryClient();

  
  return (
    <>
      <QueryClientProvider client={queryClient} >
        <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={true}/>
      </QueryClientProvider>

    </>
  )
}
