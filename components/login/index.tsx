import React, { useContext } from "react";
import dynamic from 'next/dynamic'
const LoginView = dynamic(
    () => import('./LoginView'),
    { ssr: false }
)
  
const LoginContainer = (props: any) => {
      const handler = {
        ...props
      }
    return (
        <>
            <LoginView {...handler} />
        </>
    )
}
export default LoginContainer
    