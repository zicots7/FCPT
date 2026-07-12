
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContextProvider'

type Props={
    children:React.ReactNode
}
export default function PublicRoute({children}:Props) {
    const {user,loading}=useAuth();
 
    if(user){
        return <Navigate to="/dashboard"/>
    }
  return (
    <>{children}</>
  )
}
