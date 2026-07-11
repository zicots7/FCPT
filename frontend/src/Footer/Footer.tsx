import React, { useEffect, useState } from 'react'
import type { User } from '../Types/Types';

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
         <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis " aria-label="Bootstrap"> 
         <svg className="bi me-2" width="40" height="32" aria-hidden="true"></svg> </a> 
         <ul className="nav col-md-4 justify-content-end ">
             <li className="nav-item"><a href="/dashboard" className="nav-link px-2 text-white">Home</a></li> 
             <li className="nav-item"><a href="/projects" className="nav-link px-2 text-white">Projects</a></li> 
            {user?.role==="admin"&&(
            <li className="nav-item"><a href="/clients" className="nav-link px-2 text-white">Clients</a></li> 
            )}
             <li className="nav-item"><a href="#" className="nav-link px-2 text-white">Pricing</a></li> 
             <li className="nav-item"><a href="#" className="nav-link px-2 text-white">FAQs</a></li> 
             <li className="nav-item"><a href="#" className="nav-link px-2 text-white">About</a></li> 
             </ul> </footer>
        )}
    
        </div>
        );
  
}
