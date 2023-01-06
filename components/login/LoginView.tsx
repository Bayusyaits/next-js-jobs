import React, { useState } from "react";
import Link from 'next/link'
import Image from 'next/image'
import styles from './header.module.css'

export default function Login(props: any) {

  return (
    <>
      <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between d-flex rtl-flex-d-row-r">
          <div className="logo-wrapper">
            Login
          </div>
        </div>
      </div>
    </>
  )
}
