import React from 'react'
import {type Projects} from '../Types/Types';


type pros={
     className?:string;
    pid:number;
      onSuccess:()=>void;
}
export default function AddMilestone({className,pid,onSuccess}:pros) {
  return (
        <button
            className={className}
                pid={pid}
              onClick={() => {
                setOpen(true);
                loadClients();
              }}
          >
              + Add Milestone
          </button>

  )
}
