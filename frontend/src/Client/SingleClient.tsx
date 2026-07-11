import React, { useEffect, useState } from 'react'
import type { Clients } from '../Types/Types';
import { getClients } from '../Apis/Client/getClients';
import EditClient from './EditClient';
import DeleteClient from './DeleteClient';
interface Props{
    reload:boolean;
}
export default function SingleClient({reload
}:Props) {
 const [clients,setClient]=useState<Clients[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const tryFetchClient=async()=>{

    try{
        setLoading(true);
        const data= await getClients();
        setClient(data);
    }catch(err){}finally{
        setLoading(false);
    }
    
}
useEffect(()=>{
tryFetchClient();
},[reload]);
if (loading) {
  return (
    <tbody>
      <tr>
        <td colSpan={8} className="text-center">
          Loading client... Please Wait
        </td>
      </tr>
    </tbody>
  );
}
  return (

    <>
      <tbody>
      {clients.length === 0 ? (
        <tr >
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
              <EditClient
                className="btn btn-sm btn-outline-primary me-1"
                id={client.userId}
                client={client}
                onSuccess={tryFetchClient}
              />
              <DeleteClient
                className="btn btn-sm btn-outline-danger me-1"
                id={client.userId}
                onSuccess={tryFetchClient}
                username={client.username}
              />
           </td>
          </tr>
        ))
      )}
    </tbody>
    </>
 
  )
}
