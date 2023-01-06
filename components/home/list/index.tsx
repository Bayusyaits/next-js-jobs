import React, { useContext } from "react";
import dynamic from 'next/dynamic'
import dayjs from 'dayjs'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
const HomeListView = dynamic(
    () => import('./HomeListView'),
    { ssr: false }
)
  
const HomeListContainer = (props: any) => {
    const setDate = (val: string) => {
    return dayjs(val).fromNow()
    }
    const handler = {
        ...props,
        setDate
    }
    return (
        <>
            <HomeListView {...handler} />
        </>
    )
}
export default HomeListContainer
    