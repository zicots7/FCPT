import React from 'react'
import type { Projects } from '../Types/Types'

type props={
    project:Projects;
    onSuccess:()=>void;
    className?:string;
}
export default function createLog({project,onSuccess,className}:props) {
  return (
    <div>createLog</div>
  )
}
