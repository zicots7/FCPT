import React from 'react'
import type { Projects } from '../Types/Types';

interface Props {
    id:number;
    className?:string;
    onSuccess:()=>void;
}

export default function ProjectsDetails({id,onSuccess,className}:Props) {
  return (
    <><h1>Details</h1></>
  )
}
