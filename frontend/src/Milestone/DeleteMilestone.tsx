import React from 'react'
import { deletetMilestones } from '../Apis/Milestone/deleteMilestone';

type props={
    details:string;
className?:string;
  id:number;
onSuccess:()=>void;
}
export default function DeleteMilestone({className,id,onSuccess,details}:props) {
      const handleDelete = async()=>{
              const confirmDelete =
                  window.confirm(
                      `Delete ${details}?`
                  );
              if(!confirmDelete){
                  return;
              }
      
              try{
                  await deletetMilestones(id);
      
                  onSuccess();
      
              }catch(error){
                 
                  console.log(error);
                  console.log(id);
                  alert("Delete failed");
      
              }
          };
  return (
    <button className={className}
    onClick={handleDelete}>
      Delete Milestone
    </button>
  )
}
