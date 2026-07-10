import React from 'react'
import { deleteClient } from '../Apis/Client/deleteClient';

interface Props {
    id:number;
    className?:string;
    username:string;
    onSuccess:()=>void;
}

export default function DeleteClient({id,className,username,onSuccess}:Props) {
  const handleDelete = async()=>{


        const confirmDelete =
            window.confirm(
                `Delete ${username}?`
            );


        if(!confirmDelete){
            return;
        }


        try{

            await deleteClient(id);


            onSuccess();


        }catch(error){

            console.log(error);

            alert("Delete failed");

        }

    };
   return(
    <button className={className}
    onClick={handleDelete}>
            Delete
        </button>
  )
}
