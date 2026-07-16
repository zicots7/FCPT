import React from 'react'
import type { Milestone } from '../Types/Types';

type props={
    className?:string;
    milestones:Milestone;
    onSuccess:()=>void;
}

export default function EditMilestone({className,milestones,onSuccess}:props) {
  return (
    <button
    className={className}
    >Edit Milestone</button>
  )
}
