
import api from '../Axios';
import type { CreateProjects } from '../../Types/Types';

export async function postProject(Project:CreateProjects) {
     const response= await api.post(`/projects/admin/create`,Project)
    return response.data;
}
