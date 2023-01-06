import React from "react";
import Link from 'next/link'

export default function Header() {

  return (
    <>
      <div className="navbar navbar-default navbar-fixed-top py-3 bg-primary">
        <div className="container">
          <div className="navbar-header">
            <Link className=" h1" href="/">
              <span className="text-white fw-bold">GitHub</span>
              <span className="text-light">Jobs</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
