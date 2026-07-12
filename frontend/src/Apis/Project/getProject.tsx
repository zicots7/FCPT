import React from 'react'
import type { Projects} from '../../Types/Types';
import api from '../Interceptor/Axios';

export const getProject = async (id:number): Promise<Projects> => {
    const response = await api.get(`/projects/id/${id}`);
    return response.data;
};