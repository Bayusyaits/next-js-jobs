import React, { useState } from "react";
import Link from 'next/link'
import Image from 'next/image'
import styles from './header.module.css'

export default function Header(props: any) {

  return (
    <>
      <div className="navbar navbar-default navbar-fixed-top py-3 bg-primary">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand" href="/">
              <span className="text-white">GitHub</span>
              <span className="text-light">Jobs</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
