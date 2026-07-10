import React from 'react'
import type { Projects} from '../../Types/Types';
import api from '../Axios';

export const getProjects = async (): Promise<Projects> => {
    const response = await api.get("/projects/admin/all");
    return response.data;
};