import React, { useEffect, useState } from 'react'
import type { Log, Milestone, Payment, Projects } from '../Types/Types';
import { useAuth } from '../Apis/Auth/AuthContextProvider';
import { getMilestones } from '../Apis/Milestone/getMilestone';
import AddMilestone from './AddMilestone';
import EditMilestone from './EditMilestone';
import DeleteMilestone from './DeleteMilestone';

interface Props {
    projects:Projects;
    milestones:Milestone[];
    className?:string;
    onSuccess:()=>void;
}

export default function SingleMilestone({onSuccess,className,projects,milestones}:Props) {
  const [loading,setLoading]=useState<boolean>(false);
  

  const {user}=useAuth();

      if(loading){
    return (
        <tbody>
            <tr>
                <td colSpan={8} className="text-center">
                    Milestones projects...
                </td>
            </tr>
        </tbody>
    );
}
 return(
<>
        <div className="card shadow-sm mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <span className="fw-semibold">Milestones</span>
                        {user?.role==="admin"&&(
                            <AddMilestone
                                className="btn btn-sm btn-outline-primary"
                                
                                pid={projects.pid}
                                onSuccess={onSuccess}
                             />
                        )}
                </div>
                <div className="card-body p-0">
                    <table className="table table-hover mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                {user?.role=="admin"&&(
                                <th>Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                        {milestones.length===0?(<tr >
             <td colSpan={8} className="text-center text-muted py-5">
               <p className="mb-1 fs-5">No Milesone found</p>
               <small>Add your first milestone to get started</small>
             </td>
           </tr>
         ) : (
              milestones.map((milestone,index)=>(
                            <tr key={milestone.id}>
                                <td className="text-muted">
                                {index}
                                </td>
                                <td>{ milestone.description }</td>
                                <td>₹{ milestone.amount }</td>
                                <td>
                                    { milestone.dueDate}
                                </td>
                                <td>
                                    {milestone.isPaid == "Yes"?(
                                        <span className="badge bg-success">
                                            Paid ✓
                                        </span>):
                                    milestone.isPaid == "No"?(
                                        <span className="badge bg-danger">
                                            Unpaid
                                        </span>)
                                        :(<span className="badge bg-secondary">{milestone.isPaid}</span>)}
                                </td>
                            {user?.role=="admin"&&(
                                    <td>
                                  <EditMilestone
                                  className="btn btn-sm btn-outline-primary me-1"
                                   milestones={milestone}
                                   onSuccess={onSuccess}

                                  />
                                  <DeleteMilestone
                                   className="btn btn-sm btn-outline-danger"
                                   details={milestone.description}
                                   id={milestone.id}
                                   onSuccess={onSuccess}
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