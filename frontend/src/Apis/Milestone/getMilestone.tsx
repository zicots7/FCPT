import type { Milestone} from '../../Types/Types';
import api from '../Interceptor/Axios';

export const getMilestones = async (pid:number): Promise<Milestone[]> => {
    const response = await api.get(`/milestone/id/${pid}`);
    return response.data;
};