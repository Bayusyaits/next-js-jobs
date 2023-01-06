import React from "react";
import styles from './homeSearch.module.css'
import Link from "next/link";

export default function JobsBreadcrumb() {

  return (
    <>
      <div className="py-2">
        <Link className="h5" href={`/`}>Back</Link>
      </div>
    </>
  )
}
