
import api from '../Interceptor/Axios';

export const deletetMilestones = async (id:number) => {
    return(
    await api.delete(`/milestone/admin/delete/${id}`));
};