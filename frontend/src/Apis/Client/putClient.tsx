import type { Clients, UpdateClientRequest } from '../../Types/Types';
import api from '../Interceptor/Axios';
export const PutClient=async (id:number,data:UpdateClientRequest): Promise<Clients>=> {
    const response= await api.put(`/clients/admin/update/${id}`,data)
    return response.data;
};
