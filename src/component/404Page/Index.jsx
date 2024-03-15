import React from 'react'

const PageNotFound = () => {
  return (
    <section>
        <div className="container avilabilty___col">
          <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
              <h1 className="display-1 fw-bold">404</h1>
              <p className="fs-3">
                <span className="text-danger">Opps!</span> Page not found.
              </p>
              <p className="lead">The page you’re looking for doesn’t exist.</p>
              <div className="get-started-cls why_choose_ment">
                <a href="/">
                  <button type="button" className="find-btn btn btn-primary">
                    Go to Home
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default PageNotFound
