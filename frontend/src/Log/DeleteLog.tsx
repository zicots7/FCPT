import React from 'react'
import deleteLogs from '../Apis/Logs/deleteLogs';
import type { Log, LogsResponseDTO } from '../Types/Types';

type props={
  log:string;
  className?:string;
  onSuccess:()=>void;
}
export default function DeleteLog({log,className,onSuccess}:props) {

const DeleteLog= async()=>{
const confirmDelete =
                  window.confirm(
                      `Delete ${log.details}?`
                  );
      
      
              if(!confirmDelete){
                  return;
              }
      
      
              try{
              {
          await deleteLogs(log.logId);
        }
                    
   onSuccess();
   setTimeout(() => {
          window.location.reload();
      }, 200);
      
              }catch(error){
      
                  console.log(error);
      
                  alert("Delete failed");
      
              }
      
          };
  return (
    <>
     <button
className={className}
 onClick={DeleteLog}
>
 Delete
 </button>
    </>

  )
}
