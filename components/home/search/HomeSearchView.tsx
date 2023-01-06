import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './homeSearch.module.css'

export default function HomeSearch({
  handleForm
}: any) {

  return (
    <>
      <div>
        <Form 
          id={'form-search'} 
          onSubmit={(e) => handleForm(e)}
          className={`${styles.gridRow} align-items-center`}>
          <Form.Group controlId="jobDesc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name={`description`}
              placeholder="Filter by title, benefit, companies, expertise" />
          </Form.Group>
          <Form.Group controlId="jobLoc">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name={`location`}
              placeholder="Filter by city, state, zip code or country" />
          </Form.Group>
          <Form.Group className="mt-md-4" controlId="jobFullTime">
            <Form.Check 
              type="checkbox" 
              name={`full_time`}
              label="Full Time Only" />
          </Form.Group>
          <Button 
            className="btn-md mt-md-4"
            variant="primary" 
            type="submit">
            Search
          </Button>
        </Form>
      </div>
    </>
  )
}
