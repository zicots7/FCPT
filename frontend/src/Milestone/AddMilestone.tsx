import React, { useState } from 'react'
import {type CreateMilestone, type Projects} from '../Types/Types';
import { postMilestones } from '../Apis/Milestone/postMilestone';


type pros={
     className?:string;
    pid:number;
      onSuccess:()=>void;
}
export default function AddMilestone({className,pid,onSuccess}:pros) {
       const [open,setOpen] =
            useState(false);
              const [form,setForm] =
            useState<CreateMilestone>({
                  description:"",
                  amount:0,
                  dueDate:"",
                  isPaid:"No",
                  projectNameId:pid
            });
    
        const updateField = (
            field:keyof CreateMilestone,
            value:string
        )=>{
            setForm({
                ...form,
                [field]:value
            });
        };
         const handleSubmit = async()=>{
            try{
              console.log(form);
                await postMilestones(form);
                setOpen(false);
                setForm({
                  description:"",
                  amount:0,
                  dueDate:"",
                  isPaid:"No",
                  projectNameId:pid
                });
                onSuccess();
            }catch(error){
                console.log(error);
                alert("Failed to create Milestone");
    
            }
    
        };
  return (
    <>
     <button
            className={className}
              onClick={() => {
                setOpen(true);
              }}
          >
              + Add Milestone
          </button>

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
                                Add Milestone
                            </h5>
                            <button

                                className="btn-close"

                                onClick={()=>setOpen(false)}
                            />
                        </div>


                        <div className="modal-body">

                            <div className="mb-2">
                                <label className="form-label">
                                     Milestone Description
                                </label>

                                <input
                                    className="form-control"
                                    value={form.description}
                                    onChange={(e)=>updateField("description",e.target.value)}
                                />
                            </div>
            
                            <div className="mb-2">
                                <label className="form-label">
                                    Milestone Due Date
                                </label>
                            <input
                                className="form-control mb-2"
                                type="datetime-local"
                                placeholder="dueDate"
                                value={form.dueDate}
                                onChange={
                                    e=>updateField(
                                        "dueDate",
                                        e.target.value
                                    )
                                }
                            />
                
                            </div>
                            <div className="mb-2">
                                <label className="form-label">
                                    Milestone Amount
                                </label>
                               <input
                              className="form-control mb-2"
                              type="number"
                              value={form.amount}
                              onChange={(e) =>
                                updateField("amount", e.target.value)
                              }
                            />
                            </div>

                              

                            
                            <div className="mb-2">
                                <label className="form-label">
                                    Milestone Status
                                </label>
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
                                    Yes
                                </option>
                                <option value="No">
                                    No
                                </option>
                            </select>
                                </div>
                            
                        <div className="modal-footer">
                            <button
                                className="btn btn-primary"
                                onClick={()=>handleSubmit()}
                            >
                             Add
                            </button>

                            <button
                                className="btn btn-secondary"
                                onClick={()=>setOpen(false)}
                            >
                             Cancel
                            </button>
                                

                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
       
  )

}
