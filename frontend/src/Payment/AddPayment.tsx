import React from 'react'
import type { Milestone } from '../Types/Types'
type props={
    milestones:Milestone[];
   className?:string;
   onSuccess:()=>void;
}
export default function AddPayment({milestone,className,onSuccess}:props) {
  return (
    <div>AddPayment</div>
  )
}
