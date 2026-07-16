import React from 'react'
import { deleteProject } from '../Apis/Project/deleteProject';
interface Props {
    id:number;
    title:string
    className?:string;
    onSuccess:()=>void;
}
export default function DeleteProject({id,onSuccess,className,title}:Props) {
const handleDelete = async()=>{
        const confirmDelete =
            window.confirm(
                `Delete ${title}?`
            );
        if(!confirmDelete){
            return;
        }

        try{
            await deleteProject(id);

            onSuccess();

        }catch(error){
            console.log(error);
            alert("Delete failed");

        }
    };
   return(
    <button className={className}
    onClick={handleDelete}>
            Delete Project
        </button>
   )
}
