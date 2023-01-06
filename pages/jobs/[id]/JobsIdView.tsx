import React from 'react'
import JobsBreadcrumb from 'components/jobs/breadcrumb'
import JobsDetail from 'components/jobs/detail'
function JobsIdView({
  field
}: any) {
  console.log('field', field)
  return (
    <div className="container mt-2">
      <JobsBreadcrumb />
      <JobsDetail 
        {...field}
      />
    </div>
  )
}

export default JobsIdView
