import { createStore } from 'zustand'
import type { AppProps } from 'next/app'
import React, {useEffect, useState, createContext} from 'react'
import { unregister } from 'next-offline/runtime'
import Offline from './offline'
import Layout from 'components/layout'
import Login from 'components/login'

import 'assets/css/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';


// create contact with react api

export default function App({ Component, pageProps }: AppProps) {
  const store = createStore() 
  const StoreContext = createContext(null)
  const [isDisconnected, setDisconnected] = useState<boolean>(false)
  const [isAuth, setAuth] = useState<boolean>(false)
  const handleConnectionChange = () => {
    if (!navigator.onLine) {
      setDisconnected(true)
    } else {
      setDisconnected(false)
    }
  }
  useEffect(() => {
    unregister()
    const style: any = document.getElementById('server-side-styles')
    if (style) {
      style.parentNode.removeChild(style)
    }
    window.addEventListener('offline', handleConnectionChange)
    window.addEventListener('online', handleConnectionChange)
  })
  return (
    <StoreContext.Provider value={store}>
      <Layout
        isAuth={isAuth}>
        {
          isDisconnected ? (<Offline />) : 
          isAuth ? (<Login {...pageProps}/>) :
          (<Component {...pageProps}/>)
        }
      </Layout>
    </StoreContext.Provider>
  )
}
