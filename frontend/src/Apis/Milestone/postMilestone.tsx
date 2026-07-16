import type { CreateMilestone, Milestone} from '../../Types/Types';
import api from '../Interceptor/Axios';

export const postMilestones = async (milestone:CreateMilestone):Promise<Milestone> => {
    const response = await api.post("/milestone/admin/create",milestone);
    return response.data;
};