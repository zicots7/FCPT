import type {  Projects,CreateProjects } from '../../Types/Types';
import api from '../Interceptor/Axios';
export const PutProject=async (id:number,data:CreateProjects): Promise<Projects>=> {
    const response= await api.put(`/projects/admin/update/${id}`,data)
    return response.data;
};

