
import React from 'react'

export default function Login(){
  return (

<div className="container mt-5">
    <div className="row justify-content-center">
        <div className="col-md-5 col-lg-4">
            <div className="card shadow-sm border-0">
                <div className="card-body p-4 p-md-5">
                    <h2 className="text-center mb-4 fw-bold">Login</h2>

                    <form method="POST" className="django-form">

                        <div className="d-grid gap-2 mt-4">
                            <button id="submit" className="btn btn-primary btn-lg" type="submit">
                                Sign In
                            </button>
                        </div>
                    </form>


                </div>
                  <div className="d-grid gap-2">
                        <a href="{% url 'demo_login' 'admin' %}"
                           className="btn btn-outline-primary">
                            Demo as Admin
                        </a>

                    </div>

            </div>
        </div>
    </div>
</div>
  )
}
