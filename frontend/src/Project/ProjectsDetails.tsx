import React, { useState } from 'react'
import type { Log, Milestone, Payment, Projects } from '../Types/Types';
import { useAuth } from '../Apis/Auth/AuthContextProvider';

interface Props {
    id:number;
    className?:string;
    onSuccess:()=>void;
}

export default function ProjectsDetails({id,onSuccess,className}:Props) {
  const [open,setOpen] =useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [projects, setProject] = useState<Projects[]>([]);
  const [reload,setReload] = useState(false);
   const {user}=useAuth();
      const refreshClients = ()=>{
          setReload(!reload);
      };
  return (
    <><h1>Details</h1></>
  )
}
