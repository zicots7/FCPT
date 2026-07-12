
import api from '../Interceptor/Axios';

export const deleteClient=async (id:number)=> {
  return (

    await api.delete(`/clients/admin/delete/${id}`)
  
  )
}
