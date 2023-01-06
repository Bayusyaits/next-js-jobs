import React from 'react'
import type { PropsWithChildren } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import Header from 'components/header'
import Footer from 'components/footer'
export interface ViewProps {
  handleSnackbarClose: (el: string) => void
}

export default function LayoutView({ 
  children, 
  ...props }: PropsWithChildren<any>) {
  const router = useRouter()
  const {route} = router
  return (
    <>
      {
        <Header {...props}/>
      }
      <main id="infinite-list">
        {children}
      </main>
      {<Footer />}
    </>
  )
}
