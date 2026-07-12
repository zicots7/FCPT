import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import  Logout  from '../Apis/logout/Logout';
import type { User } from '../Types/Types';



interface Props {
    user?: User;
}
 const Navbar=({user}:Props)=> {
console.log("Navbar user:", user);
        const navigate = useNavigate();

    const handleLogout = async () => {
         try {
            await Logout();
        } finally {
            localStorage.clear()
            navigate("/login");
            window.location.reload(); 
        }
    };


  return (
    <>
        <nav className="navbar fixed-top navbar-dark bg-dark border-top border-secondary shadow-lg">
            <div className="container-fluid justify-content-around">

                {user && (
                    <div className="d-flex align-items-center gap-3">

                        {user.isDemo && (
                            <span className="badge bg-warning text-dark">
                                Demo Mode - (Read Only)
                            </span>
                        )}

                        <span className="text-white">
                            {user.username}

                            <span className="badge bg-secondary ms-1">
                                {user.role}
                            </span>
                        </span>

                    </div>
                )}


                <Link
                    className="nav-link text-light text-center bg-transparent border-0"
                    to="/dashboard"
                >
                    <div className="d-block mb-1"></div>
                    <span>Home</span>
                </Link>

                {user?.role=="admin"&&(
                <Link
                    className="nav-link text-light text-center bg-transparent border-0"
                    to="/clients"
                >
                    <div className="d-block mb-1"></div>
                    <span>Clients</span>
                </Link>
                )}
                


                <Link
                    className="nav-link text-light text-center bg-transparent border-0"
                   to="/projects"
                >
                    <div className="d-block mb-1"></div>
                    <span>Projects</span>
                </Link>

                {user&&(
                                <button
                    className="nav-link text-light text-center bg-transparent border-0"
                    onClick={handleLogout}
                    type="button"
                >
                    <div className="d-block mb-1"></div>
                    <span>Logout</span>
                </button>
                )}
               

            </div>
        </nav>

    </>
    
  );
}
export default Navbar;