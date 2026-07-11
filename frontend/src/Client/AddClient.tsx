import { useState } from "react";
import { postClient} from "../Apis/Client/postClient";
import type { CreateClientRequest } from "../Types/Types";

interface Props {
    className?:string;
    onSuccess:()=>void;

}

export default function AddClient({className,onSuccess}:Props) {
    const [open,setOpen] =
        useState(false);
          const [form,setForm] =
        useState<CreateClientRequest>({
            username:"",
            firstName:"",
            lastName:"",
            password:"",
            email:"",
            company:"",
            platform:"Fiverr"
        });

    const updateField = (
        field:keyof CreateClientRequest,
        value:string
    )=>{
        setForm({
            ...form,
            [field]:value
        });
    };
     const handleSubmit = async()=>{
        try{
            await postClient(form);
            setOpen(false);
            setForm({
                username:"",
                firstName:"",
                lastName:"",
                email:"",
                password:"",
                company:"",
                platform:"Fiverr"
            });
            onSuccess();
        }catch(error){
            console.log(error);
            alert("Failed to create client");

        }

    };


  return (
    <>

        <button
            className={className}
            onClick={()=>setOpen(true)}
        >
            + Add Client
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
                                Add Client
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
  );
}
