import React from 'react'

type props={
    details:string;
className?:string;
  id:number;
onSuccess:()=>void;
}
export default function DeleteMilestone({className,id,onSuccess,details}:props) {
  return (
    <div>Delete Milestone</div>
  )
}
