import React from "react";
import Link from "next/link";
import Button from 'react-bootstrap/Button';
import styles from './homeList.module.css'

export default function HomeList({
  fields,
  setDate,
  handleLoadMore
}: any) {
  const setDom = () => {
    const d = []
    for (let i = 0; i < fields.length; i++) {
      const el = fields[i]
      if (el && el.id) {
        d.push(
          <li 
            key={`list-${el.id}-${i}`}
            className="list-group-item list-group-item-action align-items-start flex-row d-flex justify-content-between border-0 border-bottom" 
            >
            <div className="d-flex flex-column text-left align-items-start">
              <Link
                id={`link-${el.id}`}
                className={`${styles.btnLink} mb-1 h5 text-primary text-left`}
                href={`jobs/${el.id}`}
              >{el.title}
            </Link>
              <small>{el.company} | <span className="text-success fw-bold">{ el.type }</span></small>
            </div>
            <div className="d-flex flex-column text-right align-items-end">
              <p className="mb-1">{el.location}</p>
              <small>{ setDate(el.created_at) }</small>
            </div>
          </li>

        )
      }
    }
    return (d)
  }
  const setNotFound = () => {
    return (<div 
      className="list-group-item list-group-item-action align-items-start flex-row d-flex justify-content-between border-0 border-bottom">
      <div className="d-flex flex-column">
        <div className="card-header bg-white">
          <h5>Not Found</h5>
        </div>          
      </div>
    </div>)
  }
  return (
    <>
      <div className="row mt-3">
        <div className="col-12">
         <div 
            className="shadow p-3 mb-2">
            <div className="card border-0">
              <div className="card-header bg-white">
                <h4>Job List</h4>
              </div>
              <div className="card-body">
                <ul className="list-group">
                  {
                    fields && fields.length ? setDom() : setNotFound()
                  }
                </ul>
              </div>
              <div className="card-footer bg-white border-0">
                <Button 
                  onClick={(e) => handleLoadMore(e)}
                  className="btn-md btn btn-primary d-block w-100"
                  variant="primary" 
                  type="submit">
                  More Jobs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
