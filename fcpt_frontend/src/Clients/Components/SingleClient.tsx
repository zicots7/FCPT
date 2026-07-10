import type { Client } from "../Types";
import { ClientFetch } from "../ClientEndpoints/ClientFetch";
import { useEffect, useState } from "react";
import { EditClient } from "./EditClient";
import { DeleteClient } from "./DeleteClient";



export const SingleClient=()=>{

 const [clients,setClient]=useState<Client[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const tryFetchClient=async()=>{
    try{
        setLoading(true);
        const data= await ClientFetch();
        setClient(data);
    }catch(err){}finally{
        setLoading(false);
    }
    
}
useEffect(()=>{
tryFetchClient();
},[]);

 if (loading) return <div className="card loading">Loading client...</div>;
  return (
    <tbody>
      {clients.length === 0 ? (
        <tr>
          <td colSpan={8} className="text-center text-muted py-5">
            <p className="mb-1 fs-5">No clients found</p>
            <small>Add your first client to get started</small>
          </td>
        </tr>
      ) : (
        clients.map((client, index) => (
          <tr key={client.userId}>
            <td className="fw-bold">{index + 1}</td>
            <td className="fw-semibold">{client.username}</td>
            <td className="text-muted">{client.email}</td>
            <td>
              {client.platform === "Fiverr" ? (
                <span className="badge bg-success">Fiverr</span>
              ) : client.platform === "Upwork" ? (
                <span className="badge bg-primary">Upwork</span>
              ) : client.platform === "Direct" ? (
                <span className="badge bg-warning text-dark">Direct</span>
              ) : (
                <span className="badge bg-secondary">{client.platform}</span>
              )}
            </td>
            <td className="text-muted">{client.company}</td>
            <td className="text-muted">••••••••</td>
            <td className="text-muted small">{client.addedDate}</td>
            <td>
              {/* The action components just use the local fetch function to refresh */}
            <EditClient className="btn btn-sm btn-outline-primary me-1"
             id={client.userId} onSuccess={tryFetchClient}>
                Edit
            </EditClient>
        
            <DeleteClient className="btn btn-sm btn-outline-danger me-1"
             id={client.userId} onSuccess={tryFetchClient} clientUsername={client.username}/>
                Delete
            </DeleteClient>
          </tr>
        ))
      )}
    </tbody>
  );
};
