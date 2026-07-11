import React, { useState } from 'react'
import type { Clients, CreateProjects } from '../Types/Types';
import { postProject } from '../Apis/Project/postProject';
import { ClientList } from '../Client/ClientList';
import { getClients } from '../Apis/Client/getClients';
interface Props {
    className?:string;
    onSuccess:()=>void;

}
export default function AddProject({className,onSuccess}:Props) {

  const [clients, setClients] = useState<Clients[]>([]);
     const [open,setOpen] =
          useState(false);
            const [form,setForm] =
          useState<CreateProjects>({
              title:"",
              clientId:0,
              description:"",
              startDate:"",
              deadline:"",
              Status:"Pending",
              totalValue:Number(""),
              
          });
  
      const loadClients = async () => {
    try {
        const data = await getClients();
        setClients(data);
    } catch(error) {
        console.log(error);
    }
};
      const updateField = (
          field:keyof CreateProjects,
          value:string
      )=>{
          setForm({
              ...form,
              [field]:value
          });
      };
       const handleSubmit = async()=>{
          try{
              await postProject(form);
              setOpen(false);
              setForm({
              title:"",
              clientId:0,
              description:"",
              startDate:"",
              deadline:"",
              status:"Pending",
              totalValue:Number(""),
              client:"",
              });
              onSuccess();
          }catch(error){
              console.log(error);
              alert("Failed to create Project");
  
          }
  
      };
  
  

  return (
    <>
                  <button
              className={className}
              onClick={() => {
                  setOpen(true);
                  loadClients();
              }}
          >
              + Add Project
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
                                Add Project
                            </h5>
                            <button

                                className="btn-close"

                                onClick={()=>setOpen(false)}
                            />
                        </div>



                        <div className="modal-body">


                            <div className="mb-2">
                                <label className="form-label">
                                    Project Title
                                </label>

                                <input
                                    className="form-control"
                                    value={form.title}
                                    onChange={(e)=>updateField("title",e.target.value)}
                                />
                            </div>
                              <div className="mb-2">
                                <label className="form-label">
                                    Project Description
                                </label>
                                </div>
                            <input
                                className="form-control mb-2"
                                placeholder="Description"
                                value={form.description}
                                onChange={
                                    e=>updateField(
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                            <div className="mb-2">
                                <label className="form-label">
                                    Project Start Date
                                </label>
                            <input
                                className="form-control mb-2"
                                type="datetime-local"
                                placeholder="StartDate"
                                value={form.startDate}
                                onChange={
                                    e=>updateField(
                                        "startDate",
                                        e.target.value
                                    )
                                }
                            />
                                </div>

                            <div className="mb-2">
                                <label className="form-label">
                                    Project Deadline
                                </label>
                               <input
                              className="form-control mb-2"
                              type="datetime-local"
                              value={form.deadline}
                              onChange={(e) =>
                                updateField("deadline", e.target.value)
                              }
                            />
                                </div>

                            <div className="mb-2">
                                <label className="form-label">
                                    Project Total Value
                                </label>
                               <input
                                className="form-control mb-2"
                                placeholder="totalValue"
                                value={form.totalValue}
                                onChange={
                                    e=>updateField(
                                        "totalValue",
                                        e.target.value
                                    )
                                }
                            />
                              </div>
                            <div className="mb-2">
                                <label className="form-label align-content-sm-center m-lg-2">
                                     Client 
                                </label>
                             <select
                            value={form.clientId}
                            onChange={(e)=>updateField("clientId",(e.target.value))}
                            >
                            {
                            clients.map(client=>(
                              <option key={client.userId} value={client.userId}>
                                  {client.username}
                              </option>
                            ))
                            }
                            </select>
                                </div>
                            
                            <div className="mb-2">
                                <label className="form-label">
                                    Project Status
                                </label>
                                <select
                                className="form-select"

                                value={form.status}

                                onChange={
                                    e=>updateField(
                                        "status",
                                        e.target.value
                                    )
                                }
                                 >
                                <option value="Delivered">
                                    Delivered
                                </option>
                                <option value="Pending">
                                    Pending
                                </option>
                                <option value="Complete">
                                    Complete
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
  );}
