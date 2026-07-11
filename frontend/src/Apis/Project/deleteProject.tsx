import api from '../Axios';

export const deleteProject=async (id:number)=> {
  return (
    await api.delete(`/projects/admin/delete/${id}`)
  )
}