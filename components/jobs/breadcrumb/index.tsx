import React, { useContext } from "react";
import dynamic from 'next/dynamic'
const JobsIdView = dynamic(
    () => import('./JobsBreadcrumbView'),
    { ssr: false }
)
  
const JobsIdContainer = (props: any) => {
      const handler = {
        ...props
      }
    return (
        <>
            <JobsIdView {...handler} />
        </>
    )
}
export default JobsIdContainer
    