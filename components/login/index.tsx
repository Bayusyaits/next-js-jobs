import React, { useState } from "react";
import dynamic from 'next/dynamic'
import { useRouter } from "next/router";
import {
    useAuth
  } from 'store'
const LoginView = dynamic(
    () => import('./LoginView'),
    { ssr: false }
)
  
const LoginContainer = (props: any) => {
    const router  = useRouter()
    let setLogin = useAuth((state: any) => state.login.setLogin)
    const [message, setMessage] = useState<string>('')
    const onSuccess = (e: any, val: any) => {
        console.log('success', e)
        if (val && val.message) {
            setMessage(val.message)
            setLogin(true)
            setTimeout(() => {
                router.push('/')
            }, 3000)
        }
    } 
    const onFailure = (e: any, val: any) => {
        console.log('error', e)
        if (val && val.message) {
            setMessage(val.message)
            setLogin(true)
            setTimeout(() => {
                router.push('/')
            }, 3000)
        }
    } 
    const handler = {
        ...props,
        onSuccess,
        onFailure,
        message
    }
    return (
        <>
            <LoginView {...handler} />
        </>
    )
}
export default LoginContainer
    