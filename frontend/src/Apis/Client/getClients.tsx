
import type { Clients} from '../../Types/Types';
import api from '../Interceptor/Axios';

export const getClients = async (): Promise<Clients[]> => {
    const response = await api.get("/clients/admin/all");
    return response.data;
};