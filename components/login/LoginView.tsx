import React from "react";
import GoogleLogin from 'react-google-login'
export default function Login({
  onSuccess,
  message,
  onFailure
}: any) {
  const CLIENT_ID = process.env.NEXT_CLIENT_ID
  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <form className="col-8 mx-auto text-center">
              { message && message.length ? (<p className="alert alert-info">{message}</p>) : ''}
              <h5 className="text-center fw-bold mx-3 mb-4 text-muted">LOGIN</h5>
              <GoogleLogin
                clientId={CLIENT_ID as string}
                buttonText="Sign In With Google"
                cookiePolicy="single_host_origin"
                onSuccess={(e) => onSuccess(e, {message: 'Success'})}
                onFailure={(e) => onFailure(e, { message: 'Cannot sign in with Google' })}
              />
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
