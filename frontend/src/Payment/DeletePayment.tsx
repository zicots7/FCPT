import React from 'react'
import type { Payment } from '../Types/Types';
import deletePayment from '../Apis/Payments/deletePayment';

type props={
  className?:string;
  id:number
  title:string
  onSuccess:()=>void;
}
export default function DeletePayment({className,
  id,
  title,
onSuccess}:props) {
    const handleDelete = async()=>{
            const confirmDelete =
                window.confirm(
                    `Delete ${title}?`
                );
            if(!confirmDelete){
                return;
            }
    
            try{
                await deletePayment(id);
    
                onSuccess();
    
            }catch(error){
                console.log(error);
                alert("Delete failed");
    
            }
        };
  return (
    <button
    className={className}
    onClick={handleDelete}
    >
      Delete Payment
    </button>
  )
}
