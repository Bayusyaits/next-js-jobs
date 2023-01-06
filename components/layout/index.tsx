import React from 'react'
import { useRouter } from 'next/router'

import LayoutView from './LayoutView'

const LayoutContainer = ({ children, isAuth }: any) => {
  const {route} = useRouter()
  const obj = {}
  return (
    <>
      <LayoutView {...obj}>
        {children}
      </LayoutView>
    </>
  )
}

export default LayoutContainer
