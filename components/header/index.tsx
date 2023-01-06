import React, { useContext } from "react";
import dynamic from 'next/dynamic'
const HeaderView = dynamic(
    () => import('./HeaderView'),
    { ssr: false }
)
  
const HeaderContainer = (props: any) => {
      const handler = {
        ...props
      }
    return (
        <>
            <HeaderView {...handler} />
        </>
    )
}
export default HeaderContainer
    