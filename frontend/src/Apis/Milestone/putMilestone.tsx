import type { Milestone} from '../../Types/Types';
import api from '../Interceptor/Axios';

export const putMilestones = async (milestone:Milestone,id:number):Promise<Milestone[]> => {
    const response = await api.put(`/milestone/admin/update/${id}`,milestone);
    return response.data;
};