import React from 'react'
import getInvoice from '../Apis/invoice/getInvoice';
import { Navigate, useNavigate } from 'react-router-dom';

type props={
    className?:string;
    pid:number;
}
export default function Invoice({className,pid}:props) {
      const navigate=useNavigate();
    const DownloadInvoice=async()=>{
        await getInvoice(pid);
        getback();
    }
    const getback=()=>{
        navigate("/projects")
    }
  return (
   <button className={className}
   onClick={DownloadInvoice}>
    Download Invoice
   </button>
  )
}
