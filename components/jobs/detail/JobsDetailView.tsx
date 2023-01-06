import React, { useState } from "react";
import Link from 'next/link'
import Image from 'next/image'
import {
  myLoader
} from 'helpers/mixins'
import styles from './jobsDetail.module.css'

export default function JobsDetail(props: any) {
  if (!props || !props.id) {
    return (
    <div className="row mt-3 px-4 shadow">
      <div className="col-12 py-4">
        <h1 className="pb-3 fw-bolder mb-1 border-bottom border-3">Not Found!</h1>
      </div>
    </div>)
  }
  const {
    company_logo,
    company_url,
    created_at,
    description,
    id,
    location,
    title,
    type,
    url,
    how_to_apply
  } = props
  return (
    <>
      <div
        id={id}
        className="row mt-3 px-4 shadow">
        <div className="col-12 py-4">
          <div className="text-muted mb-0">{ `${type} / ${location}` }</div>
          <h1 className="pb-3 fw-bolder mb-1 border-bottom border-3">{title}</h1>
        </div>
        <div className="row">
          <div className="col-lg-7">
            <article>
              <section className="mb-5">
                <h5 dangerouslySetInnerHTML={{ __html: description }}></h5>
              </section>
            </article>
          </div>
          <div className="col-lg-5">
              <div className="card mb-4">
                <div className="card-header d-flex justify-content-between">
                  <h5>Header</h5>
                  <Link href={url}>1 other job</Link>
                </div>
                <div className="card-body">
                  <figure className="mb-4">
                  <Image
                    loader={myLoader}
                    src={company_logo}
                    alt="logo"
                    width={100}
                    height={100} />
                  </figure>
                </div>
              </div>
              <div className="card mb-4">
                <div className="card-header">
                  How to Apply
                </div>
                <div className="card-body">
                  <p dangerouslySetInnerHTML={{ __html: description }}></p>
                  <p>Email your resume to 
                    <span>
                      <a href = "mailto: join@traderrepublic.com">
                        join@traderrepublic.com
                      </a>
                    </span>
                    or apply directly
                    <span><Link href={url} /></span>
                  </p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}
