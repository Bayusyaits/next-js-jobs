import { createStore } from 'zustand'
import type { AppProps } from 'next/app'
import React, {useEffect, useState, createContext} from 'react'
import { unregister } from 'next-offline/runtime'
import _cloneDeep from 'lodash.clonedeep'
import {
  useAuth
} from 'store'
import Offline from './offline'

import Layout from 'components/layout'
import Login from 'components/login'

import 'assets/css/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';


// create contact with react api

export default function App({ Component, pageProps }: AppProps) {
  let loginState = useAuth((state: any) => state.login)
  const {
    isLoggedIn
  } = _cloneDeep(loginState)
  const store = createStore() 
  const StoreContext = createContext(null)
  const [isDisconnected, setDisconnected] = useState<boolean>(false)
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
        isAuth={isLoggedIn}>
        {
          isDisconnected ? (<Offline />) : 
          !isLoggedIn ? (<Login {...pageProps}/>) :
          (<Component {...pageProps}/>)
        }
      </Layout>
    </StoreContext.Provider>
  )
}
