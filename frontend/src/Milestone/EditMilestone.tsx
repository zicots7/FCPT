import React, { useState } from 'react'
import type { CreateMilestone, Milestone, Projects } from '../Types/Types';
import { getProject } from '../Apis/Project/getProject';
import { putMilestones } from '../Apis/Milestone/putMilestone';
import { getProjects } from '../Apis/Project/getProjects';

type props={
    className?:string;
    milestones:Milestone;
    onSuccess:()=>void;
}

export default function EditMilestone({className,milestones,onSuccess}:props) {
  const [open,setOpen] =useState(false);
  const [form,setForm] =
            useState<Milestone>(
                {
                id:milestones.id,
                description:milestones.description,
                amount:milestones.amount,
                dueDate:milestones.dueDate,
                isPaid:milestones.isPaid,
                projectNameId:milestones.projectNameId
                }
  
            );
      const updateField =(
          field: keyof CreateMilestone,
        value: string | number
          )=>{
              setForm({
                  ...form,
                  [field]:value
              });
          };
    
        const handleSubmit = async()=>{
              try{
      
                  await putMilestones(
                      form,
                      milestones.id,
                   );
      
                  setOpen(false);
                   
                  onSuccess();
      
              }catch(error){
      
                  console.log(error);
      
              }
      
          };
          
    return (
          <>
          <button
          className={className}
          onClick={() => {
                  setOpen(true);}}
          >Edit Milestone</button>
        
      {open && (
    
                <div
                  className="modal d-block"
                    style={{
                        background:"rgba(0,0,0,.5)"
                    }}
                >
                <div className="modal-dialog">
                    <div className="modal-content">
    
                            <div className="modal-header">
    
                                <h5>
                                    Edit Milestone
                                </h5>
    
    
                                <button
    
                                    className="btn-close"
    
                                    onClick={()=>setOpen(false)}
    
                                />
    
                            </div>
    
                        <div className="modal-body">
    
                                <input
                                    className="form-control mb-2"
                                    placeholder="Amount "
                                    value={form.amount}
                                    onChange={
                                        e=>updateField(
                                            "amount",
                                            e.target.value
                                        )
                                    }
                                />
    
    
                                <input
                                    className="form-control mb-2"
                                    placeholder="Description"
                                    type="description"
                                    value={form.description}
                                    onChange={
                                        e=>updateField(
                                            "description",
                                            e.target.value
                                        )
                                    }
                                />
                                <input
                                    className="form-control mb-2"
                                    placeholder="Due Date"
                                    type="datetime-local"
                                    value={form.dueDate}
                                    onChange={
                                        e=>updateField(
                                            "dueDate",
                                            e.target.value
                                        )
                                    }
                                />
                                  <select
                                  className="form-select"
  
                                  value={form.isPaid}
  
                                  onChange={
                                      e=>updateField(
                                          "isPaid",
                                          e.target.value
                                      )
                                  }
                                   >
                                  <option value="Yes">
                                      Paid
                                  </option>
                                  <option value="No">
                                      Unpaid
                                  </option>
                            
                              </select>
                                
    
                            </div>
    
                            <div className="modal-footer">
    
                            <button
                            className="btn btn-secondary"
                            onClick={() => {
                                setOpen(false);
                            }}
                            >
                            Cancel
                            </button>
                                 <button
                                className="btn btn-primary"
                                onClick={handleSubmit}
                            >
                                    Save
                                </button>
                            </div>
                    </div>
                </div>
            </div>
                    
            )}
    
      </>
     
    )
  }
  

