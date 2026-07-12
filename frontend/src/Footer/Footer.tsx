import React, { useEffect, useState } from 'react'
import type { User } from '../Types/Types';
import { Link } from 'react-router-dom';

interface Props {
    user?: User;
}
export default function Footer({user}:Props) {
     const [utcYear, setUtcYear] = useState<number | null>(null);

  useEffect(() => {
    // 1. Get the current date
    const now = new Date();
    
    // 2. Extract the 4-digit UTC year
    const currentUtcYear = now.getUTCFullYear();
    
    // 3. Save it to state
    setUtcYear(currentUtcYear);
  }, []);
  return (
    
    <div className='mb-0 pb=0' >
        {user&&(
<footer className="d-flex flex-wrap  justify-content-between bg-dark border-top border-secondary text-bg-light">
         <p className="col-md-4 mt-2 mb-0 text-white">© {utcYear}Company, Inc</p> 
         <Link to="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis " aria-label="Bootstrap"> 
         <svg className="bi me-2" width="40" height="32" aria-hidden="true"></svg> </Link> 
         <ul className="nav col-md-4 justify-content-end ">
             <li className="nav-item"><Link to="/dashboard" className="nav-link px-2 text-white">Home</Link></li> 
             <li className="nav-item"><Link to="/projects" className="nav-link px-2 text-white">Projects</Link></li> 
            {user?.role==="admin"&&(
            <li className="nav-item"><Link to="/clients" className="nav-link px-2 text-white">Clients</Link></li> 
            )}
             <li className="nav-item"><Link to="#" className="nav-link px-2 text-white">Pricing</Link></li> 
             <li className="nav-item"><Link to="#" className="nav-link px-2 text-white">FAQs</Link></li> 
             <li className="nav-item"><Link to="#" className="nav-link px-2 text-white">About</Link></li> 
             </ul> </footer>
        )}
    
        </div>
        );
  
}
