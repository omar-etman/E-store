import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from 'redux/store'
import '../styles/globals.css'
import { SWRConfig } from 'swr'
import axios from 'axios'
function MyApp({ Component, pageProps }: AppProps) {
  const fetcher = (url: any) => axios.get(url).then((res) => res.data)

  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher,
      }}
    >
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SWRConfig>
  )
}

export default MyApp
