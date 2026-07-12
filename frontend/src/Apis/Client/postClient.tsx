
import api from '../Interceptor/Axios';
import type { CreateClientRequest } from '../../Types/Types';

export async function postClient(client:CreateClientRequest) {
     const response= await api.post(`/clients/admin/register`,client)
    return response.data;
}
