import React from 'react'
import type { Payment } from '../Types/Types';

type props={
  className?:string;
  payment:Payment
  title:string
}
export default function DeletePayment({className,
  payment,
  title}:props) {
  return (
    <div>DeletePayment</div>
  )
}
