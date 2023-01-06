import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic'

const FooterView = dynamic(
    () => import('./FooterView'),
    { ssr: false }
)
  
const FooterContainer = (props: any) => {
    const handlers = {
    }
    return (
        <>
            <FooterView 
                {...handlers}
            />
        </>
    )
}
export default FooterContainer
    