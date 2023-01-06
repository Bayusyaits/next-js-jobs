import React, { useContext } from "react";
import dynamic from 'next/dynamic'
const HomeSearchView = dynamic(
    () => import('./HomeSearchView'),
    { ssr: false }
)
  
const HomeSearchContainer = (props: any) => {
      const handler = {
        ...props
      }
    return (
        <>
            <HomeSearchView {...handler} />
        </>
    )
}
export default HomeSearchContainer
    