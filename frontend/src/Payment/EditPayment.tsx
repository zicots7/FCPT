import React, { useState } from 'react'
import type { CreatePayment, Milestone, Payment, Projects } from '../Types/Types'
import putPayment from '../Apis/Payments/putPayment';
import { getMilestones } from '../Apis/Milestone/getMilestone';

type props={
  className?:string;
  payment:Payment;
  project:number;
  onSuccess:()=>void;
}

export default function EditPayment({onSuccess,className,payment,project}:props) {
  const [open,setOpen] =useState(false);
  const [milestone, setMilestone] = useState<Milestone[]>([]);
const [form,setForm] =
          useState<Payment>(
              {
              id:payment.id,
              amountPaid:payment.amountPaid,
              datePaid: payment.datePaid,
              paymentMethod: payment.paymentMethod,
              milestoneId:payment.milestoneId,
              }

          );
    const updateField =(
        field: keyof CreatePayment,
      value: string | number
        )=>{
            setForm({
                ...form,
                [field]:value
            });
        };
             const loadMilestones = async () => {
                      try {
                          const data = await getMilestones(project);
                          setMilestone(data);
                      } catch(error) {
                          console.log(error);
                      }
                  };
      const handleSubmit = async()=>{
            try{
    
                await putPayment(
                    payment.id,
                    form
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
                  setOpen(true);
                  loadMilestones();
              }}
    >Edit Payment</button>
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
                                  Edit Payment
                              </h5>
  
  
                              <button
  
                                  className="btn-close"
  
                                  onClick={()=>setOpen(false)}
  
                              />
  
                          </div>
  
                      <div className="modal-body">
  
                              <input
                                  className="form-control mb-2"
                                  placeholder="Amount Paid"
                                  value={form.amountPaid}
                                  onChange={
                                      e=>updateField(
                                          "amountPaid",
                                          e.target.value
                                      )
                                  }
                              />
  
  
                              <input
                                  className="form-control mb-2"
                                  placeholder="Date Paid"
                                  type="datetime-local"
                                  value={form.datePaid}
                                  onChange={
                                      e=>updateField(
                                          "datePaid",
                                          e.target.value
                                      )
                                  }
                              />
  
                               <select className='mt-2 mb-3'
                            value={form.milestoneId}
                            onChange={(e)=>updateField("milestoneId",Number(e.target.value))}
                            >
                            {
                            milestone.map(m=>(
                              <option key={m.id} value={m.id}>
                                  {m.description}
                              </option>
                            ))
                            }
                            </select>
                           
                                <select
                                className="form-select"

                                value={form.paymentMethod}

                                onChange={
                                    e=>updateField(
                                        "paymentMethod",
                                        e.target.value
                                    )
                                }
                                 >
                                <option value="UPI">
                                    UPI
                                </option>
                                <option value="CARD">
                                    CARD
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
