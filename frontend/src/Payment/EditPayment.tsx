import React from 'react'
import type { Payment } from '../Types/Types'

type props={
  className?:string,
  payment:Payment
  onSuccess:()=>void;
}

export default function EditPayment({onSuccess,className,payment}) {
  return (
    <button
    className={className}
    >Edit Payment</button>
  )
}
