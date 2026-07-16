import React, { useEffect, useState } from 'react'
import type { Milestone, Payment } from '../Types/Types';
import { useAuth } from '../Apis/Auth/AuthContextProvider';
import AddPayment from './AddPayment';
import DeletePayment from './DeletePayment';
import EditPayment from './EditPayment';


interface Props {
    payments:Payment[]
    milestone:Milestone[]
    className?:string;
    onSuccess:()=>void;
}

export default function SinglePayment({onSuccess,className,payments,milestone}:Props) {

  const [loading,setLoading]=useState<boolean>(false);
  const {user}=useAuth();
  
 if(loading){
    return (
        <tbody>
            <tr>
                <td colSpan={8} className="text-center">
                    Loading Payments...
                </td>
            </tr>
        </tbody>
    );
}
      return(
        <>
            <div className="card shadow-sm mb-4">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <span className="fw-semibold">Payment History</span>
                    {user?.role=="admin"&&(
                            <AddPayment
                            milestones={milestone}
                            className="btn btn-sm btn-outline-primary me-1"
                            onSuccess={onSuccess}
                        />
                    )}
                     
                </div>
                <div className="card-body p-0">
                    <table className="table table-hover mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Date</th>
                                <th>Milestone</th>
                                <th>Amount</th>
                                <th>Method</th>
                                {user?.role=="admin"&&(
                                <th>Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {payments.length===0?(<tr >
                                <td colSpan={8} className="text-center text-muted py-5">
                                <p className="mb-1 fs-5">No Payments found</p>
                                <small>Add your first payment to get started</small>
                                </td>
                            </tr>

                            ):(payments.map((payment,index)=>(
                            <tr key={index}>
                               
                                <td >
                                    { payment.datePaid}
                                </td>
                                 <td >
                                    { payment.milestone}
                                </td>
                               
                               
                                <td className="text-success fw-semibold">
                                    ₹{ payment.amountPaid }
                                </td>
                                <td>{ payment.paymentMethod }</td>
                                    {user?.role=="admin"&&(
                                 <td>

                                  <EditPayment
                                   className="btn btn-sm btn-outline-primary me-1"
                                   onSuccess={onSuccess}
                                   payment={payment}
                                   />
                                  <DeletePayment 
                                  title={payment.datePaid}
                                  className="btn btn-sm btn-outline-danger"
                                  onSuccess={onSuccess}
                                  id={payment.id}
                                  />
                                 </td>
                            )}
                               
                            </tr>
                            )))}
                        </tbody>
                    </table>
                </div>
            </div>
   


        </>
      );
    }