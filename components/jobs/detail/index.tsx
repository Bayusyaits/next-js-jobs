import React from "react";
import dynamic from 'next/dynamic'
const JobsDetailView = dynamic(
    () => import('./JobsDetailView'),
    { ssr: false }
)
  
const JobsDetailContainer = (props: any) => {
      const handler = {
        ...props
      }
    return (
        <>
            <JobsDetailView {...handler} />
        </>
    )
}
export default JobsDetailContainer
    