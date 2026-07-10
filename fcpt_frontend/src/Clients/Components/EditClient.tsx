import type { JSX } from "react/jsx-runtime";
import type { Client } from "../Types";

interface EditClientProps {
    client: Client;             // Or 'id: number' if you are using just the ID
  onSuccess: () => void;
  className?: string;         // Optional styling class
  children?: React.ReactNode; /
}
export const EditClient=({id}:EditClientProps):JSX.Element=>{
    
}