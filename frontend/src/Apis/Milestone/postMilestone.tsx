import type { Milestone} from '../../Types/Types';
import api from '../Interceptor/Axios';

export const postMilestones = async (milestone:Milestone) => {
    const response = await api.post("/milestone/admin/create",milestone);
    return response.data;
};