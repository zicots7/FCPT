
import { useState } from "react";
import AddClient from "./AddClient";
import SingleClient from "./SingleClient";

export const ClientList=()=>{
  const [reload,setReload] = useState(false);

const refreshClients = ()=>{
    setReload(!reload);
};
    return(
        <>
        <div className="container py-4">
  <div className="d-flex justify-content-between align-items-center mb-4">
    <h2 className="fw-bold mb-0">Clients</h2>
   <AddClient
    className="btn btn-primary"
    onSuccess={refreshClients}
        />
  </div>

  <div className="card shadow-sm">
    <div className="card-body p-0">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Platform</th>
            <th>Company</th>
            <th>Password</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
    <>
    <SingleClient reload={reload}/>
    </>
      </table>
    </div>
  </div>
</div>
        </>
    );
}