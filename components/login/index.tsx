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
    const [count, setCount] = useState<number>(0)
    let setLogin = useAuth((state: any) => state.login.setLogin)
    const [message, setMessage] = useState<string>('')
    const onSuccess = (e: any, val: any) => {
        console.log('success', e)
        if (val && val.message) {
            setMessage(val.message)
            setLogin(true)
            setTimeout(() => {
                router.push('/')
            }, 10000)
        }
    } 
    const onFailure = (e: any, val: any) => {
        console.log('error', e)
        let c = count
        if (val && val.message && count > 0) {
            setMessage(val.message)
            setLogin(true)
            setTimeout(() => {
                router.push('/')
            }, 10000)
        }
        c++
        setCount(c)
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
    