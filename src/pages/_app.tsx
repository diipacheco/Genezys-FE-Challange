import { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Genezys Front End Challenge</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}


