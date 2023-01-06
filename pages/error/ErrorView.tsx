import React from 'react'
import PropTypes from 'prop-types'
function ErrorView({ statusCode, message, handleRedirect }: any) {
  return (
    <div className="page-content-wrapper">
      <div className="container">
        <div className="offline-area-wrapper py-3 d-flex align-items-center justify-content-center">
          <div className="offline-text text-center">
            {/* <Image className="mb-4 px-4" src="../../../assets/img/bg-img/no-internet.png"  alt="Error Image" width={72} height={16} /> */}
            <h5>{statusCode || '5XX'}</h5>
            <p>{message}</p>
            <button className="btn btn-primary" onClick={(e) => handleRedirect(e)}>
              Kembali ke Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

ErrorView.propTypes = {
  statusCode: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
}

export default ErrorView
