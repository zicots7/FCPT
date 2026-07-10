import axios from "axios";
import type { JSX } from "react/jsx-runtime";

interface UserId{
    id:string | number,
    userName:string,
    children?: React.ReactNode,
    onSuccess:()=>void
}
export const DeleteClient=({id,userName,onSuccess}:UserId):JSX.Element=>{
    
  const handleDeleteClick = async () => {
    // Open a native browser confirm popup window
    const confirmed = window.confirm(`Are you sure you want to delete client "${userName}"?`);
    
    // If the user clicks "Cancel", stop execution immediately
    if (!confirmed) return;

    try {
      // Execute the database delete call using the unique id
      await axios.delete(`https://localhost:8080/FCPT/clients/delete/{id}`);
      
      // Trigger the parent fetch function to instantly clean up the UI table row
      onSuccess();
    } catch (err) {
      console.error("Failed to delete client:", err);
      alert("Something went wrong while trying to delete the client.");
    }
  };

  return (
    <button className="btn btn-sm btn-outline-danger" onClick={handleDeleteClick}>
      Delete
    </button>
  );
};