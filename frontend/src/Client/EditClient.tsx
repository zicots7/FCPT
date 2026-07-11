import React, { useState } from 'react'

import type { UpdateClientRequest,Clients } from '../Types/Types';
import { PutClient } from '../Apis/Client/putClient';

interface Props {
    id:number;
     client:Clients;
    className?:string;
    onSuccess:()=>void;
}


export default function EditClient({
    id,
    className,
    onSuccess,client
    }:Props) {
  

  const [open,setOpen] =useState(false);

 
    const [form,setForm] =
        useState<UpdateClientRequest>(
            {username: client.username,
            email: client.email,
            company: client.company,
            platform: client.platform,
            firstName:client.firstName,
            lastName:client.lastName,
            password: "",
            
            }

        );
  const updateField = (
        field:keyof UpdateClientRequest,
        value:string
    )=>{
        setForm({
            ...form,
            [field]:value
        });
    };
  const handleSubmit = async()=>{
        try{


            await PutClient(
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
            onClick={()=>setOpen(true)}
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
                                Edit Client
                            </h5>


                            <button

                                className="btn-close"

                                onClick={()=>setOpen(false)}

                            />

                        </div>

             <div className="modal-body">


                            <input
                                className="form-control mb-2"
                                placeholder="Username"
                                value={form.username}
                                onChange={
                                    e=>updateField(
                                        "username",
                                        e.target.value
                                    )
                                }
                            />


                            <input
                                className="form-control mb-2"
                                placeholder="First name"
                                value={form.firstName}
                                onChange={
                                    e=>updateField(
                                        "firstName",
                                        e.target.value
                                    )
                                }
                            />


                            <input
                                className="form-control mb-2"
                                placeholder="Last name"
                                value={form.lastName}
                                onChange={
                                    e=>updateField(
                                        "lastName",
                                        e.target.value
                                    )
                                }
                            />


                            <input
                                className="form-control mb-2"
                                placeholder="Email"
                                value={form.email}
                                onChange={
                                    e=>updateField(
                                        "email",
                                        e.target.value
                                    )
                                }
                            />


                            <input
                                className="form-control mb-2"
                                placeholder="Password"
                                type="password"
                                value={form.password}
                                onChange={
                                    e=>updateField(
                                        "password",
                                        e.target.value
                                    )
                                }
                            />


                            <input
                                className="form-control mb-2"
                                placeholder="Company"
                                value={form.company}
                                onChange={
                                    e=>updateField(
                                        "company",
                                        e.target.value
                                    )
                                }
                            />



                            <select

                                className="form-select"

                                value={form.platform}

                                onChange={
                                    e=>updateField(
                                        "platform",
                                        e.target.value
                                    )
                                }

                            >

                                <option value="Fiverr">
                                    Fiverr
                                </option>


                                <option value="Upwork">
                                    Upwork
                                </option>


                                <option value="Direct">
                                    Direct
                                </option>


                            </select>

                        </div>

                        <div className="modal-footer">

                        <button
                        className="btn btn-secondary"
                        onClick={() => {
                            setOpen(false);
                            setTimeout(() => {
                            window.location.reload();
                            }, 150);
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
