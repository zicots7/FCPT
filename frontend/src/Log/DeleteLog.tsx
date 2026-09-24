
import deleteLogs from '../Apis/Logs/deleteLogs';
type props={
  logId:string;
  className?:string;
  onSuccess:()=>void;
}
export default function DeleteLog({logId,className,onSuccess}:props) {

const deleteLog= async()=>{
const confirmDelete =
                  window.confirm(
                      `Delete ${logId}?`
                  );
              if(!confirmDelete){
                return;
              }
          try{
          await deleteLogs(logId);
           onSuccess();
              }catch(error){
                  console.log(error);
                  alert("Delete failed");
              }
          };
  return (
    <>
     <button
className={className}
 onClick={deleteLog}
>
 Delete
 </button>
    </>

  )
}
