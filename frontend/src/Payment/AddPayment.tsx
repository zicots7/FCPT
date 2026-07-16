import React, { useState } from 'react'
import type { CreatePayment, Milestone } from '../Types/Types'
import postPayment from '../Apis/Payments/postPayment';
type props={
    milestones:Milestone[];
   className?:string;
   onSuccess:()=>void;
}
export default function AddPayment({milestones,className,onSuccess}:props) {

  const [open,setOpen] =
            useState(false);
              const [form,setForm] =
            useState<CreatePayment>({
              amountPaid:0,
              datePaid:"",
              paymentMethod:"CARD",
              milestoneId:0,
            });
    
        const updateField = (
            field:keyof CreatePayment,
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
                await postPayment(form);
                setOpen(false);
                setForm({
                  amountPaid:0,
                  datePaid:"",
                  paymentMethod:"CARD",
                  milestoneId:0
                });
                onSuccess();
            }catch(error){
                console.log(error);
                alert("Failed to create Payment");
    
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
              + Add Payment
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
                                Add Payment
                            </h5>
                            <button

                                className="btn-close"

                                onClick={()=>setOpen(false)}
                            />
                        </div>


                        <div className="modal-body">

                            <div className="mb-2">
                                <label className="form-label">
                                     Amount Paid
                                </label>

                                <input
                                    className="form-control"
                                    value={form.amountPaid}
                                    onChange={(e)=>updateField("amountPaid",e.target.value)}
                                />
                            </div>
            
                            <div className="mb-2">
                                <label className="form-label">
                                    Date 
                                </label>
                            <input
                                className="form-control mb-2"
                                type="datetime-local"
                                placeholder="datePaid"
                                value={form.datePaid}
                                onChange={
                                    e=>updateField(
                                        "datePaid",
                                        e.target.value
                                    )
                                }
                            />
                
                            </div>
                              <div className="mb-2">
                                  <label className="form-label">
                                    Milestone
                                  </label>

                                  <select
                                    className="form-select"
                                    value={form.milestoneId}
                                    onChange={(e) =>
                                      setForm({
                                        ...form,
                                        milestoneId: Number(e.target.value)
                                      })
                                    }
                                  >
                                    <option value={0}>
                                      Select Milestone
                                    </option>

                                    {milestones.map((milestone) => (
                                      <option 
                                        key={milestone.id} 
                                        value={milestone.id}
                                      >
                                        {milestone.description}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                            <div className="mb-2">
                                <label className="form-label">
                                    Payment Method
                                </label>
                                <select
                                className="form-select"

                                value={form.paymentMethod}

                                onChange={
                                    e=>updateField(
                                        "paymentMethod",
                                        e.target.value
                                    )
                                }>

                              <option value="UPI">
                                    UPI
                                </option>
                                <option value="CASH">
                                    CASH
                                </option>
                                <option value="NET_BANKING">
                                    NET_BANKING
                                </option>
                                <option value="CRYPTO">
                                    CRYPTO
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

  )}
