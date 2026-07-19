import React, { useState } from 'react'
import type { Clients, CreateProjects, Projects } from '../Types/Types';
import { PutProject } from '../Apis/Project/PutProject';
import { getClients } from '../Apis/Client/getClients';
interface Props {
    id:number;
    project:CreateProjects;
    className?:string;
    onSuccess:()=>void;
}

export default function EditProject({id, project,onSuccess,className}:Props) {
  const [open,setOpen] =useState(false);
  
   const [clients, setClients] = useState<Clients[]>([]);
      const [form,setForm] =
          useState<CreateProjects>(
              {title: project.title,
              description: project.description,
              startDate: project.startDate,
              deadline: project.deadline,
              Status:project.Status,
              totalValue:project.totalValue,
              client: project.client,
              clientId:project.clientId  
              }
  
          );
             const loadClients = async () => {
              try {
                  const data = await getClients();
                  setClients(data);
              } catch(error) {
                  console.log(error);
              }
          };
  
    const updateField =(
      field: keyof CreateProjects,
    value: string | number
      )=>{
          setForm({
              ...form,
              [field]:value
          });
      };
    const handleSubmit = async()=>{
          try{
  
  
              await PutProject(
                  id,
                  form
               );
  
              setOpen(false);
               
              onSuccess();
  
  
          }catch(error){
  
              console.log(error);
  
          }
  
      };
      
   
        return(
              <>
    
        <button
              className={className}
              onClick={() => {
                  setOpen(true);
                  loadClients();
              }}
          >
              Edit
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
                                  Edit Project
                              </h5>
  
  
                              <button
  
                                  className="btn-close"
  
                                  onClick={()=>setOpen(false)}
  
                              />
  
                          </div>
  
               <div className="modal-body">
  
                              <input
                                  className="form-control mb-2"
                                  placeholder="Title"
                                  value={form.title}
                                  onChange={
                                      e=>updateField(
                                          "title",
                                          e.target.value
                                      )
                                  }
                              />
  
  
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
  
  
                              <input
                                  className="form-control mb-2"
                                  placeholder="Start Date"
                                  value={form.startDate}
                                  onChange={
                                      e=>updateField(
                                          "startDate",
                                          e.target.value
                                      )
                                  }
                              />
  
  
                              <input
                                  className="form-control mb-2"
                                  placeholder="Deadline"
                                  value={form.deadline}
                                  onChange={
                                      e=>updateField(
                                          "deadline",
                                          e.target.value
                                      )
                                  }
                              />
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
  
  
                               <select className='mt-2 mb-3'
                            value={form.clientId}
                            onChange={(e)=>updateField("clientId",Number(e.target.value))}
                            >
                            {
                            clients.map(client=>(
                              <option key={client.userId} value={client.userId}>
                                  {client.username}
                              </option>
                            ))
                            }
                            </select>
                            
                                <select
                                className="form-select"

                                value={form.Status}

                                onChange={
                                    e=>updateField(
                                        "Status",
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
