import React, { useState } from 'react'
import SingleProject from './SingleProject'
import AddProject from './AddProject';
import { useAuth } from "../Apis/Auth/AuthContextProvider";
export default function ProjectList() {
      const [reload,setReload] = useState(false);
    const {user}=useAuth();
    const refreshClients = ()=>{
        setReload(!reload);
    };
  return (
  <>
  <div className="container py-4">

  <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
    <h2 className="fw-bold mb-0 mt-2">Projects</h2>
    {user?.role==="admin"&&(
        <AddProject 
            className="btn btn-primary"
            onSuccess={refreshClients}
            />
    )}
    
  </div>

  <div className="card shadow-sm">
    <div className="card-body p-0">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Client</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Total Value</th>
            <th>Actions</th>
          </tr>
        </thead>
            <SingleProject reload={reload}
            user={user}/>
    </table>
    </div>
  </div>

</div>
  </>
  )
}
